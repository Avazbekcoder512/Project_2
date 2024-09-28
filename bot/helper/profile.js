const { bot } = require("../bot")

const Profile = async (msg) => {
    const chatId = msg.from.id
    const userResponse = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`, {
        method: 'GET'
    });

    const userData = await userResponse.json();
 
    if (userData[0].Language === "O'zb" && msg.text === "👤 Profile") {      
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
<b>Ism</b>:  ${userData[0].Firstname}\n
<b>Familiya</b>:  ${userData[0].Lastname}\n
<b>Foydalanuvchi nomi</b>:  ${userData[0].Username}\n
<b>Telefon raqami</b>:  ${userData[0].Phone_number}`, keyboard)
    }

    if (userData[0].Language === "Rus" && msg.text === "👤 Профиль") {
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
<b>Имя</b>:  ${userData[0].Firstname}\n
<b>Фамилия</b>:  ${userData[0].Lastname}\n
<b>Имя пользователя</b>:  ${userData[0].Username}\n
<b>Номер телефона</b>:  ${userData[0].Phone_number}`, keyboard)
    }

    if (userData[0].Language === "Eng" && msg.text === "👤 Profile") { 
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
<b>Firstname</b>:  ${userData[0].Firstname}\n
<b>Lastname</b>:  ${userData[0].Lastname}\n
<b>Username</b>:  ${userData[0].Username}\n
<b>Phone number</b>:  ${userData[0].Phone_number}`, keyboard)
    }
}

module.exports = {Profile}