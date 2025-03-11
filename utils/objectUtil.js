/**
 *
 * @param {JSON} jsonObject
 * @param {Array<string> | string} keys
 */
module.exports = function removeKeyInObject(jsonObject, keys) {
    if(!Array.isArray(keys)) {
        jsonObject[keys] = null
        delete jsonObject[keys]
    }
    else {
        for (const key of keys) {
            jsonObject[key] = null
            delete jsonObject[key]
        }
    }
    return jsonObject
}
