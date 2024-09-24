const axios = require("axios")
const { bot } = require("../bot")

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${day}-${month}-${year}`

const getWeatherEn = async (msg) => {
    const lat = msg.location.latitude
    const lon = msg.location.longitude
    const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`)
    const chatId = msg.from.id
    const weather = data.data.weather[0].main; 

    let weatherDescription;
    switch (weather) {
      case "Rain":
        weatherDescription = "It's raining 🌧";
        break;
      case "Clear":
        weatherDescription = "Clear skies ☀️";
        break;
      case "Clouds":
        weatherDescription = "Cloudy 🌥";
        break;
      case "Snow":
        weatherDescription = "Snowing ❄️";
        break;
      case "Thunderstorm":
        weatherDescription = "Thunderstorm ⛈";
        break;
      case "Drizzle":
        weatherDescription = "Light rain 🌦";
        break;
      case "Mist":
      case "Fog":
        weatherDescription = "Misty 🌫";
        break;
      case "Smoke":
        weatherDescription = "Smoky 🌫";
        break;
      case "Haze":
        weatherDescription = "Hazy 🌫";
        break;
      case "Dust":
      case "Sand":
        weatherDescription = "Dust or sandstorm 🌪";
        break;
      case "Ash":
        weatherDescription = "Volcanic ash 🌋";
        break;
      case "Squall":
        weatherDescription = "Squally winds 💨";
        break;
      case "Tornado":
        weatherDescription = "Tornado 🌪";
        break;
      default:
        weatherDescription = "Unknown weather condition";
        break;
    }

    // Sending the message to the user
    bot.sendMessage(chatId, `<b>${formattedDate}</b> weather report \n
<b>🌤 Weather condition: </b> ${weatherDescription} \n
<b>🌡 Temperature: </b> ${data.data.main.temp} °C \n
<b>💨 Wind speed: </b> ${data.data.wind.speed} m/s \n
<b>🏛 Country: </b> ${data.data.sys.country} \n
<b>🏙 City: </b> ${data.data.name}`, {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          ["Menu"]
        ],
        resize_keyboard: true
      }
    });
}

module.exports = getWeatherEn