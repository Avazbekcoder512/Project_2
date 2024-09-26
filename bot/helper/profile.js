const { bot } = require("../bot")
const User = require("../../model/user.model")

const Profile = async (msg) => {
    const chatId = msg.from.id
    const user = await User.findOne({chatId: chatId}).lean()

    
    if (user.language === "O'zb" && msg.text === "👤 Profile") {      
        const keyboard = {
            reply_markup: {
                keyboard: [
                    ["Menyu"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            },
            parse_mode: "HTML"
        }
        
        bot.sendMessage(chatId, `<strong>👤 Profile</strong>\n
<b>Ism</b>:  ${user.first_name}\n
<b>Familiya</b>:  ${user.last_name}\n
<b>Foydalanuvchi nomi</b>:  ${user.username}\n
<b>Telefon raqami</b>:  ${user.phone}`, keyboard)
    }

    if (user.language === "Rus" && msg.text === "👤 Профиль") {
        const keyboard = {
            reply_markup: {
                keyboard: [
                    ["Меню"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            },
            parse_mode: "HTML"
        }
        
        bot.sendMessage(chatId, `<strong>👤 Профиль</strong>\n
<b>Имя</b>:  ${user.first_name}\n
<b>Фамилия</b>:  ${user.last_name}\n
<b>Имя пользователя</b>:  ${user.username}\n
<b>Номер телефона</b>:  ${user.phone}`, keyboard)
    }

    if (user.language === "Eng" && msg.text === "👤 Profile") { 
        const keyboard = {
            reply_markup: {
                keyboard: [
                    ["Menu"]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            },
            parse_mode: "HTML"
        }

        bot.sendMessage(chatId, `<strong>👤 Profile</strong>\n
<b>Firstname</b>:  ${user.first_name}\n
<b>Lastname</b>:  ${user.last_name}\n
<b>Username</b>:  ${user.username}\n
<b>Phone number</b>:  ${user.phone}`, keyboard)
    }
}

module.exports = {Profile}