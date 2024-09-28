const { bot } = require("./bot")
const { start, addContact } = require("./helper/commands")
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
  
    const userResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`,
        {
          method: "GET",
        }
      );
    
      const userData = await userResponse.json();
    
    if (text === "/start") {
        start(msg)
    }

        
    if(userData[0]) {
        if (!userData[0].Phone_number && userData[0].Language) {
            addContact(msg)
        }
        
        if(userData[0].Role === "admin") {
            adminMenyu(msg)
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

        if (msg.location && userData[0].Language === "O'zb") {
            getWeatherUz(msg)
        } else if (msg.location && userData[0].Language === "Rus") {
            getWeatherRu(msg)
        } else if (msg.location && userData[0].Language === "Eng") {
            getWeatherEn(msg)
        }
    }

})