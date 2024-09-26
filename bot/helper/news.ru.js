const { bot } = require("../bot");
const Parser = require("rss-parser");
const parser = new Parser();

const newsPerPage = 5;
let cachedNews = [];

const getNewsRu = async (msg) => {
  const chatId = msg.from.id;

  if (msg.text === "📰 Новости") {
    try {
      let feed = await parser.parseURL("https://kun.uz/ru/news/rss");
      cachedNews = feed.items;

      showNewsPageRu(chatId, 0);
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "Произошла ошибка при загрузке новостей.");
    }
  }
};


  const showNewsPageRu = async (chatId, page) => {
    let start = page * newsPerPage;
    let end = start + newsPerPage;
    let newsToShow = cachedNews.slice(start, end);

      try {
        let messageText = newsToShow
        .map((item) => {
          return `📰 *${item.title}*\n📅 ${item.pubDate}\n🔗 [Прочитать статью](${item.link})`;
        })
        .join("\n\n");
  
        let inlinekeyboard = [[]]
  
        if(page > 0) {
          inlinekeyboard[0].push({ text: '⬅️ Предыдущий', callback_data: `prev_${page - 1}` });
        } 
          inlinekeyboard[0].push({ text: `📄 Страница ${page + 1}`, callback_data: 'current_page' });
  
          if (end < cachedNews.length) {
              inlinekeyboard[0].push({ text: 'Следующий ➡️', callback_data: `next_${page + 1}` });
          }
  
        const sentMessage = await bot.sendMessage(chatId, messageText, {
          parse_mode: 'Markdown',
          reply_markup: {
              inline_keyboard: inlinekeyboard
          }
      });
      return sentMessage
      } catch (error) {
        console.log(error);
      }
}


module.exports = {
  getNewsRu,
  showNewsPageRu
};
