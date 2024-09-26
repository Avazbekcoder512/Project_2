const { bot } = require("../bot")
const User = require("../../model/user.model")

const getAllUsers = async (msg) => {
    const chatId = msg.from.id
    const user = await User.findOne({chatId: chatId}).lean()
    

    if (msg.text === "👥 Foydalanuvchilar") {
        const users = await User.find().lean()
        
        let list = ''
        users.forEach(user => {
            list+= `<b>👤 Foydalanuvchi nomi: </b>${user.username},\n<b>Botga birinchi kirgan vaqti: </b>${user.createdAt.toLocaleString()},\n<b>Telefon raqami: </b>${user.phone}\n\n`
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

    if (user.admin && msg.text === "👥 Пользователи") {
        const users = await User.find().lean()
        
        let list = ''
        users.forEach(user => {
            list+= `<b>👤 Имя пользователя: </b>${user.username},\n<b>Время первого входа бота: </b>${user.createdAt.toLocaleString()},\n<b>Номер телефона: </b>${user.phone}\n\n`
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
            user.action = "Menu"
            await User.findByIdAndUpdate(user._id, user, {new:true})
    }

    if (user.admin && msg.text === "👥 Users") {
        const users = await User.find().lean()
        
        let list = ''
        users.forEach(user => {
            list+= `<b>👤 Username: </b>${user.username},\n<b>The time the bot first entered: </b>${user.createdAt.toLocaleString()},\n<b>Phone number: </b>${user.phone}\n\n`
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
            user.action = "Menu"
            await User.findByIdAndUpdate(user._id, user, {new:true})
    }
}

module.exports = { getAllUsers }