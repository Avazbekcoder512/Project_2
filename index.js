const express = require("express")
const { dotenv } = require("dotenv").config()
require("./bot/bot")
const app = express()





app.listen(process.env.PORT, () => {
    console.log("Bot ishga tushdi");
})