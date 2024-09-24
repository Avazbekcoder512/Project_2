const axios = require("axios")
const { bot } = require("../bot")

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${day}-${month}-${year}`

const getWeatherRu = async (msg) => {
    const lat = msg.location.latitude
    const lon = msg.location.longitude
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`)
    const chatId = msg.from.id
    const weather = data.data.weather[0].main; 

    let weatherDescription;
    switch (weather) {
      case "Rain":
        weatherDescription = "Идёт дождь 🌧";
        break;
      case "Clear":
        weatherDescription = "Ясно ☀️";
        break;
      case "Clouds":
        weatherDescription = "Облачно 🌥";
        break;
      case "Snow":
        weatherDescription = "Идёт снег ❄️";
        break;
      case "Thunderstorm":
        weatherDescription = "Гроза ⛈";
        break;
      case "Drizzle":
        weatherDescription = "Мелкий дождь 🌦";
        break;
      case "Mist":
      case "Fog":
        weatherDescription = "Туманно 🌫";
        break;
      case "Smoke":
        weatherDescription = "Задымлено 🌫";
        break;
      case "Haze":
        weatherDescription = "Лёгкий туман 🌫";
        break;
      case "Dust":
      case "Sand":
        weatherDescription = "Пыльная или песчаная буря 🌪";
        break;
      case "Ash":
        weatherDescription = "Вулканический пепел 🌋";
        break;
      case "Squall":
        weatherDescription = "Шквалистый ветер 💨";
        break;
      case "Tornado":
        weatherDescription = "Торнадо 🌪";
        break;
      default:
        weatherDescription = "Неизвестное состояние погоды";
        break;
    }

    bot.sendMessage(chatId, `<b>${formattedDate}</b> прогноз погоды \n
<b>🌤 Погодные условия: </b> ${weatherDescription} \n
<b>🌡 Температура воздуха: </b> ${data.data.main.temp} °C \n
<b>💨 Скорость ветра: </b> ${data.data.wind.speed} м/с \n
<b>🏛 Страна: </b> ${data.data.sys.country} \n
<b>🏙 Город: </b> ${data.data.name}`, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          ["Меню"]
        ],
        resize_keyboard: true
      }
    });
}

module.exports = getWeatherRu