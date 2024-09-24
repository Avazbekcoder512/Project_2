const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

try {
    exports.connectMongodb = async function () {
        const mongodbPass = process.env.MONGODB_PASS
        const url = `mongodb+srv://qalandarovavazbek1:${mongodbPass}@yangilikbot.fto2p.mongodb.net/?retryWrites=true&w=majority&appName=Yangilikbot`
        await mongoose
        .connect(url, {})
        .then(() => {
            console.log("Mongodb connect successfull");
        })
        .catch((err) => {
            console.log(err);
        })
    }
} catch (error) {
    console.log(error);   
}