const { bot } = require("../bot");
const Parser = require("rss-parser");
const parser = new Parser();

const newsPerPage = 5;
let cachedNews = [];

const getNewsEn = async (msg) => {
  const chatId = msg.from.id;

  if (msg.text === "📰 News") {
    try {
      let feed = await parser.parseURL("https://kun.uz/en/news/rss");
      cachedNews = feed.items;

      showNewsPageEn(chatId, 0);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "There was an error loading news.");
    }
  }
};

const showNewsPageEn = async (chatId, page) => {
  let start = page * newsPerPage;
  let end = start + newsPerPage;
  let newsToShow = cachedNews.slice(start, end);

  try {
    let messageText = newsToShow
      .map((item) => {
        return `📰 *${item.title}*\n📅 ${item.pubDate}\n🔗 [Read the article](${item.link})`;
      })
      .join("\n\n");

    let inlinekeyboard = [[]];

    if (page > 0) {
      inlinekeyboard[0].push({
        text: "⬅️ Previous",
        callback_data: `prev_${page - 1}`,
      });
    }

    if (end < cachedNews.length) {
      inlinekeyboard[0].push({
        text: "Next ➡️",
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
  getNewsEn,
  showNewsPageEn,
};
