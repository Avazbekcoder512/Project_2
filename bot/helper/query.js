const { bot } = require("../bot");
const { showNewsPageUz } = require("./news.uz");
const { showNewsPageRu } = require("./news.ru");
const { showNewsPageEn } = require("./news.en");

bot.on("callback_query", async (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;

  const userResponse = await fetch(
    `https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`,
    {
      method: "GET",
    }
  );

  const userData = await userResponse.json();

  bot.editMessageReplyMarkup(
    { inline_keyboard: [] },
    { chat_id: chatId, message_id: query.message.message_id }
  );

  if (!userData || userData.length === 0 || !userData[0].Language) {
    if (data === "O'zbek tili") {
      const newUserResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/ChatId/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Language: "O'zb",
            },
          }),
        }
      );

      const newUserData = await newUserResponse.json();
      console.log(newUserData);
      bot.sendMessage(
        chatId,
        "Assalomu alaykum 👋. Botimizga xush kelibsiz 🤝. Iltimos telefon raqamingizni yuboring",
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
    } else if (data === "Rus tili") {
      const newUserResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/ChatId/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Language: "Rus",
            },
          }),
        }
      );

      const newUserData = await newUserResponse.json();
      console.log(newUserData);
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
    } else if (data === "Ingliz tili") {
      const newUserResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/ChatId/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Language: "Eng",
            },
          }),
        }
      );

      const newUserData = await newUserResponse.json();
      console.log(newUserData);
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
  } else if (userData[0] && userData[0].Language) {
    if (data === "O'zbek tili") {
      const newUserResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/ChatId/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Language: "O'zb",
            },
          }),
        }
      );

      const newUserData = await newUserResponse.json();
      console.log(newUserData);
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
      const newUserResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/ChatId/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Language: "Rus",
            },
          }),
        }
      );

      const newUserData = await newUserResponse.json();
      console.log(newUserData);
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
      const newUserResponse = await fetch(
        `https://sheetdb.io/api/v1/${process.env.DB_KEY}/ChatId/${chatId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Language: "Eng",
            },
          }),
        }
      );

      const newUserData = await newUserResponse.json();
      console.log(newUserData);
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

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  let action = query.data;

  const userResponse = await fetch(
    `https://sheetdb.io/api/v1/${process.env.DB_KEY}/search?ChatId=${chatId}`,
    {
      method: "GET",
    }
  );

  const userData = await userResponse.json();

  try {
    if (userData[0].Language === "O'zb") {
      if (action.startsWith("next_")) {
        let page = parseInt(action.split("_")[1]);
        showNewsPageUz(chatId, page);
      } else if (action.startsWith("prev_")) {
        let page = parseInt(action.split("_")[1]);
        showNewsPageUz(chatId, page);
      }
    }
    if (userData[0].Language === "Rus") {
      if (action.startsWith("next_")) {
        let page = parseInt(action.split("_")[1]);
        showNewsPageRu(chatId, page);
      } else if (action.startsWith("prev_")) {
        let page = parseInt(action.split("_")[1]);
        showNewsPageRu(chatId, page);
      }
    }
    if (userData[0].Language === "Eng") {
      if (action.startsWith("next_")) {
        let page = parseInt(action.split("_")[1]);
        showNewsPageEn(chatId, page);
      } else if (action.startsWith("prev_")) {
        let page = parseInt(action.split("_")[1]);
        showNewsPageEn(chatId, page);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
