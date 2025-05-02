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
 * @param {Number} year
 * @param {Number} month
 * @returns {Array<{date: string}>}
 */
function getAllDaysOfMonth(year, month) {
    const endOfMonth = new Date(year, month, 0).getDate();
    let daysInMonth = [];
    for (let day = 1; day <= endOfMonth; day++) {
        let newDate;
        if (day === 1) {
            newDate = new Date(year, month, day).toISOString();
        } else {
            newDate = new Date(year, month - 1, day).toISOString();
        }
        daysInMonth.push({
            date:`${newDate.split("T")[0]}` // Store exact date
        });
    }
     daysInMonth = daysInMonth.sort(function (a, b) {
        if (new Date(a.date) >= new Date(b.date)) return 0;
        return -1;
    })
    return daysInMonth;
}

/**
 *
 * @param {Number} year
 * @returns {[{date: string},{date: string},{date: string},{date: string},{date: string},null,null,null,null,null,null,null]}
 */
function getAllMonths(year) {
    return [
        {
            date: `${year}-01`
        },
        {
            date: `${year}-02`
        },
        {
            date: `${year}-03`
        },
        {
            date: `${year}-04`
        },
        {
            date: `${year}-05`
        },
        {
            date: `${year}-06`
        },
        {
            date: `${year}-07`
        },
        {
            date: `${year}-08`
        },
        {
            date: `${year}-09`
        },
        {
            date: `${year}-10`
        },
        {
            date: `${year}-11`
        },
        {
            date: `${year}-12`
        }
    ]
}

module.exports = {
    dateDiffInDays,
    addDays,
    getAllDaysOfMonth,
    getAllMonths,
}
