const express = require("express")
const { dotenv } = require("dotenv").config()
const { connectMongodb } = require("./database/connect")
require("./bot/bot")
connectMongodb()
const app = express()





app.listen(process.env.PORT, () => {
    console.log("Bot ishga tushdi");
})