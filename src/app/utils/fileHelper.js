const { writeFile, readFile } = require('fs/promises');

module.exports = {
    fileReader, fileWriter
};

/**
 * 
 * @param {string} location 
 * @param {string} filename 
 * @returns 
 */
async function fileReader(location, filename) {
    return await readFile(`${location}${filename}`).catch((err) => {
        throw err;
    })
}
/**
 * 
 * @param {string} location 
 * @param {string} filename 
 * @param {Array|object|Array<object>} data 
 * @returns 
 */
async function fileWriter(location, filename, data) {
    return await writeFile(`${location}${filename}`, data).catch((err) => {
        throw err;
    })
}