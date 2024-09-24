const { bot } = require("../bot")
const User = require("../../model/user.model")

const WeatherKeyboard = async (msg) => {
    const chatId = msg.from.id
    const user = await User.findOne({chatId: chatId})

    if (msg.text === "🌤 Ob-havo") {
        bot.sendMessage(chatId, "Iltimos 📍 lakatsiyangizni yuboring", {
            reply_markup: {
                keyboard: [
                    [{
                        text: "📍 Lokatsiyani yuborish",
                        request_location: true
                    }]
                ],
                resize_keyboard: true,
            }
        })
        
    }

    if (msg.text === "🌤 Погода") {
        bot.sendMessage(chatId, "Пожалуйста, пришлите свое 📍 местонахождениеg", {
            reply_markup: {
                keyboard: [
                    [{
                        text: "📍 Отправить местоположение",
                        request_location: true
                    }]
                ],
                resize_keyboard: true,
            }
        })
    }

    if (msg.text === "🌤 Weather") {
        bot.sendMessage(chatId, "Please send your 📍 lacation", {
            reply_markup: {
                keyboard: [
                    [{
                        text: "📍 Send location",
                        request_location: true
                    }]
                ],
                resize_keyboard: true,
            }
        })
    }
}

module.exports = WeatherKeyboard