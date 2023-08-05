const { fileReader, fileWriter } = require('../utils/fileHelper');
const { updateVideoAssets } = require('../service/fcData.sql')
const { updateVideoContent } = require('../service/fcData.dynamo')
const excelToJson = require('convert-excel-to-json');
const path = require('path');


const updateSheetVideoData = async () => {
    let fcGuid = process.env.FC_ID;
    let videoOriginalData = null;
    let xlsSheetVideo = null;
    try {
        videoOriginalData = await fileReader(path.join(__dirname, '../../data/rds/'), `${fcGuid}-video-original-data.json`);
        videoOriginalData = JSON.parse(videoOriginalData);
        videoOriginalData = [videoOriginalData[0]];
        xlsSheetVideo = excelToJson({
            sourceFile: `${path.join(__dirname, '../../data/xls/')}${fcGuid}-ready-data.xlsx`
        });
        xlsSheetVideo = xlsSheetVideo && xlsSheetVideo.Sheet1;
        xlsSheetVideo.splice(0, 1);
        xlsSheetVideo = convertToGuidKey(xlsSheetVideo);
        for (let index = 0; index < videoOriginalData.length; index++) {
            let video = videoOriginalData[index];
            let videoAssets = video.video_assets;
            if (videoAssets && videoAssets.hlsDetail) {
                videoAssets.hlsDetail.url = xlsSheetVideo[video.guid];
                videoAssets.hls = xlsSheetVideo[video.guid];
                video.video_assets = videoAssets;
                videoOriginalData[index] = video;
                await updateVideoAssets(video.guid, JSON.stringify(videoAssets)).then(() => {
                    console.log(`${video.guid} :: RDS UPDATE SUCCESS`)
                }).catch((err) => {
                    console.log(`${video.guid} :: RDS UPDATE FAILED`, err)
                });
                await updateVideoContent(video.guid, videoAssets).then(() => {
                    console.log(`${video.guid} :: DYNAMO UPDATE SUCCESS`)
                }).catch((err) => {
                    console.log(`${video.guid} :: DYNAMO UPDATE FAILED`, err)
                });;
            }
        }

    } catch (err) {
        console.log("ERROR IN READ FILE :: ", err);
        throw err;
    }
    await fileWriter(path.join(__dirname, '../../data/xls/'), `${fcGuid}-video-updated-data.json`, JSON.stringify(videoOriginalData));
}

function convertToGuidKey(data) {
    let keyData = {};
    data.map((item) => {
        keyData[item["A"]] = item["I"];
    })
    return keyData;
}

function updateVideoRDS() {

}

function updateVideoDynamoDB() {

}
module.exports = {
    updateSheetVideoData
}