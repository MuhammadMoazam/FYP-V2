const generateTrackingNumber = (prefix = "UC", suffix = "PK") => {
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}${suffix}`;
};

module.exports = { generateTrackingNumber };