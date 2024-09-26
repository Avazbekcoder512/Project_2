const { bot } = require("../bot");
const User = require("../../model/user.model");
const { showNewsPageUz } = require("./news.uz");
const { showNewsPageRu } = require("./news.ru");
const { showNewsPageEn } = require("./news.en");

bot.on("callback_query", async (query) => {
  const data  = query.data;
  const chatId = query.message.chat.id;
  const user = await User.findOne({ chatId: chatId }).lean();

  bot.editMessageReplyMarkup({inline_keyboard: [] }, 
    { chat_id: chatId, message_id: query.message.message_id})

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

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const user = await User.findOne({ chatId: chatId }).lean();

  if (user.language === "O'zb") {
      if (data.startsWith('next_')) {
        let nextPage = parseInt(data.split('_')[1]);
        showNewsPageUz(chatId, nextPage);
    } else if (data.startsWith('prev_')) {
        let prevPage = parseInt(data.split('_')[1]);
        showNewsPageUz(chatId, prevPage);
    }
  }
  if (user.language === "Rus") {
      if (data.startsWith('next_')) {
        let nextPage = parseInt(data.split('_')[1]);
        showNewsPageRu(chatId, nextPage);
    } else if (data.startsWith('prev_')) {
        let prevPage = parseInt(data.split('_')[1]);
        showNewsPageRu(chatId, prevPage);
    }
  }
  if (user.language === "Eng") {
    if (data.startsWith('next_')) {
      let nextPage = parseInt(data.split('_')[1]);
      showNewsPageEn(chatId, nextPage);
  } else if (data.startsWith('prev_')) {
      let prevPage = parseInt(data.split('_')[1]);
      showNewsPageEn(chatId, prevPage);
  }
}
});