const { bot } = require("../bot");

const Menu = async (msg) => {
  const chatId = msg.from.id;
  const userResponse = await fetch(`https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`, {
    method: 'GET'
  });
  const userData = await userResponse.json();

  if (userData[0].Phoen_number) {
    switch (userData[0].Language) {
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