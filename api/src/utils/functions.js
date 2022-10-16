
const customizeDate = (str) => {
    if (!str) {
        return;
    }
    let customDate = str.replaceAll('/', '-').split('-').reverse()
    if (customDate[1].length === 1) {
        customDate[1] = `0${customDate[1]}`
    }
    if (customDate[2].length === 1) {
        customDate[2] = `0${customDate[2]}`
    }
    customDate = customDate.join('-')
    return customDate
}


module.exports = {
    customizeDate
};