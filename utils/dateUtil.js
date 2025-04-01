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

/**
 *
 * @param year
 * @param month
 * @returns Array<{date: Date}>
 */
function getAllDaysOfMonth(year, month) {
    // Get the first and last day of the current month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    // Generate an array of all dates in April
    const daysInMonth = [];
    for (let d = new Date(startOfMonth.getTime()); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        daysInMonth.push({
            date: `${year}-${month}-${day}` // Store exact date
        });
    }
    return daysInMonth;
}

module.exports = {
    dateDiffInDays,
    addDays,
    getAllDaysOfMonth
}
