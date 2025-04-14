function formatCreatedAndUpdatedDateForList(data) {
    data.forEach((item) => {
        item.createdAt = item.createdAt.toLocaleString()
        item.updatedAt = item.updatedAt.toLocaleString()
    })
    return data
}
module.exports = {
    formatCreatedAndUpdatedDateForList
}
