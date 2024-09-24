const { bot } = require("../bot")
const User = require("../../model/user.model")

const userMenu = async (msg) => {
    const chatId = msg.from.id    
    const user = await User.findOne({chatId: chatId})

    if (!user.admin) {
        if (user.language === "O'zb" && msg.text === "Menyu") {
            bot.sendMessage(chatId, "Tanlang",
                {
                    reply_markup: {
                        keyboard:[
                            ["📰 Yangiliklar", "🌤 Ob-havo"],
                            ["👤 Profile"]
                        ],
                        resize_keyboard: true
                    }
                })
        }

        if (user.language === "Rus" && msg.text === "Меню") {
            bot.sendMessage(chatId, "Выбирать",
                {
                    reply_markup: {
                        keyboard:[
                            ["📰 Новости", "🌤 Погода"],
                            ["👤 Профиль"]
                        ],
                        resize_keyboard: true
                    } 
                })
        }

        if (user.language === "Eng" && msg.text === "Menu") {
            bot.sendMessage(chatId, "Select",
                {
                    reply_markup: {
                        keyboard:[
                            ["📰 News", "🌤 Weather"],
                            ["👤 Profile"]
                        ],
                        resize_keyboard: true
                    }
                })
        }
    }
}

module.exports = { userMenu }