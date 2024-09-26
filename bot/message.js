const { bot } = require("./bot")
const { start, addContact } = require("./helper/commands")
const User = require("../model/user.model")
const { userMenu } = require("./helper/userMenyu")
const { getAllUsers } = require("./helper/users")
const { Profile } = require("./helper/profile")
const adminMenyu = require("./helper/adminMenyu")
const getWeatherRu = require("./helper/weather.ru")
const getWeatherEn = require("./helper/weather.en")
const getWeatherUz = require("./helper/weather.uz")
const WeatherKeyboard = require("./helper/weather.keyboard")
const { getNewsUz } = require("./helper/news.uz")
const { getNewsRu } = require("./helper/news.ru")
const { getNewsEn } = require("./helper/news.en")

bot.on("message" , async msg => {
    const chatId = msg.from.id
    const text = msg.text 
  
    
    if (text === "/start") {
        start(msg)
    }

    const user = await User.findOne({chatId: chatId}).lean()
        
    if(user) {
        if (!user.phone && user.language) {
            addContact(msg)
        }
        
        
        if (user.admin) {
            adminMenyu(msg)
        }
        
        if(user.admin) {
            getAllUsers(msg),
            Profile(msg)
        } else {
            Profile(msg)
        }
        
        userMenu(msg)
        WeatherKeyboard(msg)
        getNewsUz(msg)
        getNewsRu(msg)
        getNewsEn(msg)

        if (msg.location && user.language === "O'zb") {
            getWeatherUz(msg)
        } else if (msg.location && user.language === "Rus") {
            getWeatherRu(msg)
        } else if (msg.location && user.language === "Eng") {
            getWeatherEn(msg)
        }
    }

})