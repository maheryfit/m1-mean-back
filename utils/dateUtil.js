function dateDiffInDays(date_1, date_2) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date_1.getFullYear(), date_1.getMonth(), date_1.getDate());
    const utc2 = Date.UTC(date_2.getFullYear(), date_2.getMonth(), date_2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = {
    dateDiffInDays
}
