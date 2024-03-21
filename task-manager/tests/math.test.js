const {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

test("should convert 32 F to 0 c", () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const temp = celsiusToFahrenheit(0);
  expect(temp).toBe(32);
});

// test('async test demo' ,(done)=>{
//      setTimeout(()=>{
//            const temp = celsiusToFahrenheit(0);
//            expect(temp).toBe(3);
//            done()
//      },2000)

// });

test("shoud add two numbers", (done) => {
  add(2, 3).then((sum) => { 
     expect(sum).toBe(5);
     done()
  });
});

test("shoud add two numbers", async() => {
   const sum = await add(2,3);
   exprect(sum).toBe(5);
});