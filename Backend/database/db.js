require('dotenv').config()
const mongoose = require("mongoose")

exports.connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}