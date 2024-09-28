const { bot } = require("../bot");
const Parser = require("rss-parser");
const parser = new Parser();

const newsPerPage = 5;
let cachedNews = [];

const getNewsUz = async (msg) => {
  const chatId = msg.from.id;

  if (msg.text === "📰 Yangiliklar") {
    try {
      let feed = await parser.parseURL("https://kun.uz/news/rss");
      cachedNews = feed.items;

      showNewsPageUz(chatId, 0);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "Yangiliklarni yuklashda xatolik yuz berdi.");
    }
  }
};

const showNewsPageUz = async (chatId, page) => {
  let start = page * newsPerPage;
  let end = start + newsPerPage;
  let newsToShow = cachedNews.slice(start, end);
  try {
    let messageText = newsToShow
      .map((item) => {
        return `📰 *${item.title}*\n📅 ${item.pubDate}\n🔗 [Maqolani o'qish](${item.link})`;
      })
      .join("\n\n");

    let inlinekeyboard = [[]];

    if (page > 0) {
      inlinekeyboard[0].push({
        text: "⬅️ Oldingi",
        callback_data: `prev_${page - 1}`,
      });
    }
    if (end < cachedNews.length) {
      inlinekeyboard[0].push({
        text: "Keyingi ➡️",
        callback_data: `next_${page + 1}`,
      });
    }

    const sentMessage = await bot.sendMessage(chatId, messageText, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: inlinekeyboard,
      },
    });

    return sentMessage;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getNewsUz,
  showNewsPageUz,
};
