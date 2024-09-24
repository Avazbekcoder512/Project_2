const { bot } = require("../bot")
const User = require("../../model/user.model")

const adminMenyu = async (msg) => {
    const chatId = msg.from.id    
    const user = await User.findOne({chatId: chatId})

    if (user.admin) {
        if (user.language === "O'zb" && msg.text === "Menyu") {
            bot.sendMessage(chatId, "Talang", 
                {
                    reply_markup:{
                        keyboard: [
                            ["📰 Yangiliklar", "🌤 Ob-havo"],
                            ["👤 Profile", "👥 Foydalanuvchilar"]
                        ],
                        resize_keyboard: true
                    }
                })                
        }

        if (user.language === "Rus" && msg.text === "Меню") {
            bot.sendMessage(chatId, "Выбирать", 
                {
                    reply_markup:{
                        keyboard: [
                            ["📰 Новости", "🌤 Погода"],
                            ["👤 Профиль", "👥 Пользователи"]
                        ],
                        resize_keyboard: true
                    }
                })
        }

        if (user.language === "Eng" && msg.text === "Menu") {
            bot.sendMessage(chatId, "Select", 
                {
                    reply_markup:{
                        keyboard: [
                            ["📰 News", "🌤 Weather"],
                            ["👤 Profile", "👥 Users"]
                        ],
                        resize_keyboard: true
                    }
                })
        }
    }
}

module.exports = adminMenyu