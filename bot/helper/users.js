const { bot } = require("../bot")

const getAllUsers = async (msg) => {
    const chatId = msg.from.id
    const userResponse = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`, {
        method: 'GET'
    });

    const userData = await userResponse.json();

    const userRespons = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}`, {
        method: 'GET'
    });

    const usersData = await userRespons.json()

    if (msg.text === "👥 Foydalanuvchilar") {
        
        let list = ''
        usersData.forEach(userData => {
            list+= `<b>👤 Foydalanuvchi nomi: </b>${userData.Username},\n<b>Botga birinchi kirgan vaqti: </b>${userData.CreatedAt.toLocaleString()},\n<b>Telefon raqami: </b>${userData.Phone_number}\n\n`
        })

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
        bot.sendMessage(chatId, `<strong>📑 FOYDALANUVCHILAR RO'YXATI</strong>\n
${list}`, keyboard)
    }

    if (msg.text === "👥 Пользователи") {
        
        let list = ''
        usersData.forEach(userData => {
            list+= `<b>👤 Имя пользователя: </b>${userData.Username},\n<b>Время первого входа бота: </b>${userData.CreatedAt.toLocaleString()},\n<b>Номер телефона: </b>${userData.Phone_number}\n\n`
        })

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
        bot.sendMessage(chatId, `<strong>📑 СПИСОК ПОЛЬЗОВАТЕЛЕЙ</strong>\n
${list}`, keyboard)
    }

    if (msg.text === "👥 Users") {
        
        let list = ''
        usersData.forEach(userData => {
            list+= `<b>👤 Username: </b>${userData.Username},\n<b>The time the bot first entered: </b>${userData.CreatedAt.toLocaleString()},\n<b>Phone number: </b>${userData.Phone_number}\n\n`
        })

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
        bot.sendMessage(chatId, `<strong>📑 LIST OF USERS</strong>\n
${list}`, keyboard)
    }
}

module.exports = { getAllUsers }