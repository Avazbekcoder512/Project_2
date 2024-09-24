const { bot } = require("../bot");
const User = require("../../model/user.model");

bot.on("callback_query", async (query) => {
  const { data } = query;
  const chatId = query.from.id;
  const user = await User.findOne({ chatId: chatId }).lean();

  if (!user.language) {
    if (data === "O'zbek tili") {
      await User.findByIdAndUpdate(
        user._id,
        {
          ...user,
          language: "O'zb",
        },
        { new: true }
      );
      bot.sendMessage(
        chatId,
        "Assalomu alaykum 👋. Botimizga xush kelibsuz 🤝. Iltimos telefon raqamingizni yuboring",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "📱 Telefon raqamni yuborish",
                  request_contact: true,
                },
              ],
            ],
            resize_keyboard: true,
          },
        }
      );
    }

    if (data === "Rus tili") {
      await User.findByIdAndUpdate(
        user._id,
        {
          ...user,
          language: "Rus",
        },
        { new: true }
      );
      bot.sendMessage(
        chatId,
        "Привет 👋. Добро пожаловать в наш бот 🤝. Пожалуйста, пришлите свой номер телефона",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "📱 Отправить номер телефона",
                  request_contact: true,
                },
              ],
            ],
            resize_keyboard: true,
          },
        }
      );
    }

    if (data === "Ingliz tili") {
      await User.findByIdAndUpdate(
        user._id,
        {
          ...user,
          language: "Eng",
        },
        { new: true }
      );
      bot.sendMessage(
        chatId,
        "Hello 👋. Welcome to our bot 🤝. Please send your phone number",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "📱 Send phone number",
                  request_contact: true,
                },
              ],
            ],
            resize_keyboard: true,
          },
        }
      );
    }
  } else if (user.language) {
    if (data === "O'zbek tili") {
      await User.findByIdAndUpdate(
        user._id,
        {
          ...user,
          language: "O'zb",
        },
        { new: true }
      );
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
    }

    if (data === "Rus tili") {
      await User.findByIdAndUpdate(
        user._id,
        {
          ...user,
          language: "Rus",
        },
        { new: true }
      );
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
    }

    if (data === "Ingliz tili") {
      await User.findByIdAndUpdate(
        user._id,
        {
          ...user,
          language: "Eng",
        },
        { new: true }
      );
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
    }
  }
});