const { getFastChannelProgramVideoData } = require('../service/fcData.sql')
const { fileWriter } = require('../utils/fileHelper');
const path = require('path');

async function collectFastChannelDataRDS() {
    try {
        let fcGuid = process.env.FC_ID;
        let videoDetails = await getFastChannelProgramVideoData(fcGuid);
        videoDetails = parseData(videoDetails);
        await fileWriter(path.join(__dirname, '../../data/rds/'), `${fcGuid}-video-original-data.json`, JSON.stringify(videoDetails));
        videoDetails = transformUtilityData(videoDetails);
        await fileWriter(path.join(__dirname, '../../data/rds/'), `${fcGuid}-video-utility-data.json`, JSON.stringify(videoDetails));


    } catch (err) {
        throw err;
    }
}

function parseData(assets) {
    return assets.map((item) => {
        return { ...item, video_assets: JSON.parse(item.video_assets), closed_captions: JSON.parse(item.closed_captions) }
    })
}

function transformUtilityData(data) {
    return data.map((item) => {
        return {
            guid: item.guid,
            original_key: item.original_key,
            video_assets: item.video_assets.hls,
            closed_captions_vtt: item.closed_captions && item.closed_captions.filter((i) => { i.format === 'VTT' }),
            title: item.title,
            permalink: item.permalink
        }
    })
}

module.exports = {
    collectFastChannelDataRDS
}
