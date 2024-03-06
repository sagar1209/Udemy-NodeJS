const request = require("request");

const geocodeURL = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      address +
      ".json?access_token=pk.eyJ1IjoiYWJoaS10IiwiYSI6ImNscjdhczlrejI1dnoyaXA4cTIzazgxbHkifQ.wc-bRaVMfY8wAjBPvqNUQA&limit=1";
    request({ url, json: true }, (error,{body}) => {
      if (error) {
        callback("unable to connect the weather api", undefined);
      }
      else if (body.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined)
      }
      else {
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      }
    });
  };

  module.exports = {
     geocodeURL,
  }