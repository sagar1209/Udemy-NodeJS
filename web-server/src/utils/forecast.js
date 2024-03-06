const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ba04f9a250fc1814524bbc10b67e8d2d&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) callback("unable to connect the weather api", undefined);
    else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.weather[0].description +
          ". It is currently " +
          body.main.temp +
          " degress out."
      );
    }
  });
};

module.exports = {
  forecast,
};
