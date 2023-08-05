const { execute } = require('../connection/MySQL');
const ENV = (process.env.ENV || 'staging');
const dataSource = require('../config/env')[`${ENV}`].db;
/**
 * 
 * @param {uuid} guid  
 * @returns 
 */
const getFastChannelData = async (guid) => {
    let fcData = await execute(`SELECT * FROM ${dataSource.database}.fastchannel  where guid = '${guid}'`);
    return fcData;
}

/**
 * 
 * @param {uuid} guid  
 * @returns 
 */
const getFastChannelPrograms = async (fcId) => {
    let programs = await execute(`SELECT * FROM ${dataSource.database}.fastchannel_programs where channel_id = ${fcId}`);
    return programs;
}

/**
 * 
 * @param {uuid} fcGuid || fast channel guid
 * @returns 
 */
const getFastChannelProgramVideoData = async (fcGuid) => {
    let videoDetails = execute(`select id, guid, original_key, title, video_assets,closed_captions,permalink from ${dataSource.database}.video where guid IN (SELECT content_id FROM ${dataSource.database}.fastchannel_programs where channel_id = (select id FROM ${dataSource.database}.fastchannel where guid = '${fcGuid}'))`);
    return videoDetails;
}

const updateVideoAssets = async (guid, assets) => {
    let updatedVideo = execute(`UPDATE ${dataSource.database}.video SET video_assets = '${assets}' WHERE guid = '${guid}'`);
    return updatedVideo;
}


module.exports = {
    updateVideoAssets,
    getFastChannelData,
    getFastChannelPrograms,
    getFastChannelProgramVideoData
}