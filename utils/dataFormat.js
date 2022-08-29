const dayjs = require('dayjs');

const timestamp = (date) => {
    const dateToday = dayjs().format('DD, MMM, YYYY')
    return dateToday 
}

module.exports = timestamp;