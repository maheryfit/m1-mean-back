/**
 *
 * @param date_1
 * @param date_2
 * @returns {number}
 */
function dateDiffInDays(date_1, date_2) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    date_1 = new Date(date_1);
    date_2 = new Date(date_2);
    const utc1 = Date.UTC(date_1.getFullYear(), date_1.getMonth(), date_1.getDate());
    const utc2 = Date.UTC(date_2.getFullYear(), date_2.getMonth(), date_2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 *
 * @param {Date} date
 * @param {{type: Number | NumberConstructor, required: boolean, validate: {validator: function(*): boolean, message: string}}} days
 * @returns {Date}
 */
function addDays(date, days) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = {
    dateDiffInDays,
    addDays
}
