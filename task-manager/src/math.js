const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = (temp) => {
  return temp * 1.8 + 32;
};

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(2)
      resolve(a + b);
    }, 2000);
  });
};

module.exports = {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
};
