const home = document.querySelector(`#home-link`)
home.addEventListener(`click`, (e) => {
    window.location.href = `../index.html`
})

const link = document.querySelector(`#link-register`)
link.addEventListener(`click`, (e) => {
    window.location.href = `../register.html`
})

const blogLink = document.querySelector(`#blog-link`)
blogLink.addEventListener(`click` , (e) =>{
    window.location.href =`../all.html`;
    console.log(`salom`);
})

const  Bussines = document.querySelector(`#Bussines-link`)
home.addEventListener(`click`, (e) => {
    window.location.href = `../index.html`
})

Bussines.addEventListener(`click`, (e) => {
    window.location.href = "../busness.html"
})

const menu = document.querySelector(".menu")
menu.addEventListener("click", (e) => {
const list = document.querySelector(".list-item")
list.classList.toggle("active")
})