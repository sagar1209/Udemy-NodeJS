console.log("hello from javascript");



const form = document.querySelector("form");
const search  = document.querySelector('input');
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");



form.addEventListener("submit",(e)=>{
    e.preventDefault()
    message1.textContent = "Loading........"
    message2.textContent = ''
    const address = search.value;
    fetch("http://localhost:3000/weather?address="+ address).then((Response) => {
    Response.json().then((data) => {
    if (data.error) {
         message1.textContent = data.error; 
    } else {
         message1.textContent = data.location;
         message2.textContent = data.address;
    }
  });
});
    
});
