const { bot } = require("../bot")

const userMenu = async (msg) => {
    const chatId = msg.from.id    
    const userResponse = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`, {
        method: 'GET'
    });

    const userData = await userResponse.json();

    if (userData[0].Role === "user") {
        if (userData[0].Language === "O'zb" && msg.text === "Menyu") {
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

        if (userData[0].Language === "Rus" && msg.text === "Меню") {
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

        if (userData[0].Language === "Eng" && msg.text === "Menu") {
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