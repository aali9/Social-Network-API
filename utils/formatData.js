const daysjs = require("dayjs");

const formatdates = (date) => {
  const Dates = dayjs().format("DD, MMM, YYYY");
  return Dates;
};

module.exports = formatdates;