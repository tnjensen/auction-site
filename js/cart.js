import { openMenu } from "./components/menuButton.js";
import displayMessage from "./components/displayMessage.js";
const menuButton = document.querySelector('.bars');
const registerInfo = document.querySelector('.register-info');
const logLink = document.querySelector('.logLink');
const regLink = document.querySelector('.regLink');
const credits = document.querySelector('.credits');
const divider = document.querySelector('.profile-divider');
const user = JSON.parse(localStorage.getItem('user'));
const userCredits = JSON.parse(localStorage.getItem('credits'));
const userAvatar = JSON.parse(localStorage.getItem('avatar'));
const userToken = JSON.parse(localStorage.getItem('token'));

const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2023){
  year.innerHTML = `2023 - `+ date;
}else{
  year.innerHTML = date;
}

credits.style = "display:none";

if(user){
    console.log(user);
    logLink.innerHTML = "Logout";
    regLink.innerHTML = `<img src=${userAvatar} class="avatarHeaderImg" style="width:40px; border-radius:50% "/>`;
    credits.innerHTML = "Credits: NOK " + userCredits;
    divider.style = "display:none";
    registerInfo.style = "display:none";
    inputForm.style = "display:block";
}

menuButton.onclick = openMenu;


