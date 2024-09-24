const { bot } = require("../bot");
const User = require("../../model/user.model");

const Menu = async (msg) => {
  const chatId = msg.from.id;
  const user = await User.findOne({ chatId: chatId }).lean();

  if (user.phone) {
    switch (user.language) {
      case "O'zb":
        bot.sendMessage(
          chatId,
          "Assalomu alaykum 👋. Botimizga xush kelibsuz 🤝. Botdan to'liq foydalanish uchun Menyuni bosing",
          {
            reply_markup: {
              keyboard: [[{ text: "Menyu" }]],
              resize_keyboard: true,
            },
          }
        );
        break;
      case "Rus":
        bot.sendMessage(
          chatId,
          "Привет 👋. Добро пожаловать в наш бот 🤝. Нажмите «Меню», чтобы полностью использовать бота.",
          {
            reply_markup: {
              keyboard: [[{ text: "Меню" }]],
              resize_keyboard: true,
            },
          }
        );
        break;
      case "Eng":
        bot.sendMessage(
          chatId,
          "Hello 👋. Welcome to our bot 🤝. Click the Menu button to fully utilize the bot",
          {
            reply_markup: {
              keyboard: [[{ text: "Menu" }]],
              resize_keyboard: true,
            },
          }
        );
        break;
    }
  }
};

module.exports = Menu