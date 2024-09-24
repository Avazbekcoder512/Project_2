const { bot } = require("../bot")
const User = require("../../model/user.model")

const getAllUsers = async (msg) => {
    const chatId = msg.from.id
    const user = await User.findOne({chatId: chatId}).lean()
    

    if (msg.text === "👥 Foydalanuvchilar") {
        const users = await User.find().lean()
        
        let list = ''
        users.forEach(user => {
            list+= `<b>${user.username}</b>: ${user.createdAt.toLocaleString()}\n`
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
        bot.sendMessage(chatId, `<strong>Foydalanuvchilar ro'yhati</strong>
${list}`, keyboard)
    }

    if (user.admin && msg.text === "👥 Пользователи") {
        const users = await User.find().lean()
        
        let list = ''
        users.forEach(user => {
            list+= `<b>${user.username}</b>: ${user.createdAt.toLocaleString()}\n`
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
        bot.sendMessage(chatId, `<strong>Список пользователей</strong>
${list}`, keyboard)
            user.action = "Menu"
            await User.findByIdAndUpdate(user._id, user, {new:true})
    }

    if (user.admin && msg.text === "👥 Users") {
        const users = await User.find().lean()
        
        let list = ''
        users.forEach(user => {
            list+= `<b>${user.username}</b>: ${user.createdAt.toLocaleString()}\n`
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
        bot.sendMessage(chatId, `<strong>List of users</strong>
${list}`, keyboard)
            user.action = "Menu"
            await User.findByIdAndUpdate(user._id, user, {new:true})
    }
}

module.exports = { getAllUsers }