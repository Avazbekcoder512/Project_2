const axios = require("axios")
const { bot } = require("../bot")

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${day}-${month}-${year}`




const getWeatherUz = async (msg) => {
    const lat = msg.location.latitude
    const lon = msg.location.longitude
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`)
    const chatId = msg.from.id
    const weather = data.data.weather[0].main;
    
    let weatherDescription;
    switch (weather) {
      case "Rain":
        weatherDescription = "Yomg'ir yog'moqda 🌧";
        break;
      case "Clear":
        weatherDescription = "Quyoshli ☀️";
        break;
      case "Clouds":
        weatherDescription = "Bulutli 🌥";
        break;
      case "Snow":
        weatherDescription = "Qor yog'moqda ❄️";
        break;
      case "Thunderstorm":
        weatherDescription = "Momaqaldiroq ⛈";
        break;
      case "Drizzle":
        weatherDescription = "Mayda yomg'ir yog'moqda 🌦";
        break;
      case "Mist":
      case "Fog":
        weatherDescription = "Tumanli 🌫";
        break;
      case "Smoke":
        weatherDescription = "Tutunli ob-havo 🌫";
        break;
      case "Haze":
        weatherDescription = "Engil tumanli 🌫";
        break;
      case "Dust":
      case "Sand":
        weatherDescription = "Changli yoki qumli bo'ron 🌪";
        break;
      case "Ash":
        weatherDescription = "Vulqon kulidan iborat 🌋";
        break;
      case "Squall":
        weatherDescription = "Shamolli bo'ron 💨";
        break;
      case "Tornado":
        weatherDescription = "Tornado 🌪";
        break;
      default:
        weatherDescription = "Noma'lum ob-havo holati";
        break;
    }

    bot.sendMessage(chatId , `<b>${formattedDate}</b> sanadagi ob-havo ma'lumoti \n
<b>🌤 Ob-havo holati: </b> ${weatherDescription} \n
<b>🌡 Havo harorati: </b> ${data.data.main.temp} °C \n
<b>💨 Shamo tezligi: </b> ${data.data.wind.speed} m/s \n
<b>🏛 Davlat: </b> ${data.data.sys.country} \n
<b>🏙 Shahar: </b> ${data.data.name}`,{
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        ["Menyu"]
      ],
      resize_keyboard: true
    }})
}

module.exports = getWeatherUz