import { openMenu } from "./components/menuButton.js";
import displayMessage from "./components/displayMessage.js";
const menuButton = document.querySelector('.bars');
const registerInfo = document.querySelector('.register-info');
const listingInfo = document.querySelector('.listing-info');
const baseUrl = 'https://api.noroff.dev/api/v1/auction/';
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const itemId = params.get("id");
const listings = 'listings';
const slider = document.querySelector('.slider');
const logLink = document.querySelector('.logLink');
const regLink = document.querySelector('.regLink');
const credits = document.querySelector('.credits');
const divider = document.querySelector('.profile-divider');
const user = JSON.parse(localStorage.getItem('user'));
const userCredits = JSON.parse(localStorage.getItem('credits'));
const userAvatar = JSON.parse(localStorage.getItem('avatar'));
const userToken = JSON.parse(localStorage.getItem('token'));
const inputForm = document.querySelector('.inputForm');
const inputTitle = document.querySelector('.inputTitle');
const inputDesc = document.querySelector('.inputDesc');
const inputEndsAt = document.querySelector('.inputEndsAt');
const messageContainer = document.querySelector('.message-container');
const loader = document.querySelector('.loader');
const angle = document.querySelector('i');

let index = 0;
let maxPages = 0;
let postsPerPage = 0;
let postResult = [];
let pageResult = [];
let postPage = 0;
let mobile = 480;
let tablet = 768;
let height = 575.98; 
let desktop = 992;
let large = 1280;

const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2023){
  year.innerHTML = `2023 - `+ date;
}else{
  year.innerHTML = date;
}

messageContainer.style = "display:none";
inputForm.style = "display:none";
credits.style = "display:none";

if(user){
    console.log(user);
    logLink.innerHTML = "Logout";
    logLink.style = "text-decoration: none";
    regLink.innerHTML = `<img src=${userAvatar} class="avatarHeaderImg" style="width:40px; border-radius:50% "/>`;
    credits.innerHTML = "Credits: NOK " + userCredits;
    divider.style = "display:none";
    registerInfo.style = "display:none";
    listingInfo.style = "display:none";
    inputForm.style = "display:block";
    messageContainer.style = "display:block";
}

menuButton.onclick = openMenu;

angle.onclick = function(){
   window.location.href = "/";
}
async function getItem(){
    try{
        const response = await fetch(baseUrl + listings + "/" + itemId);
        const result = await response.json();  
        slider.innerHTML = "";
        loader.innerHTML = "";
        postResult = result;
        loader.classList.remove('loading-indicator');
        let currentSlide = result;
        createHTML(result);
    }
    catch(error){
      console.log("Error: " + error);
    }
}
getItem();

function createHTML(result){ 
        if(!result){
            return;
        }else{
          let bidLink = `<a href="profile.html?id=${result.id}#bid" class="btn btn-secondary">View bids</a>`;
          if(user){
            bidLink = `<a href="profile.html?id=${result.id}#bid" class="btn btn-secondary">Make a bid</a>`;
          }
          slider.innerHTML = `<div class="card detail">
            <img src=${result.media[0]} alt='item image' class="card-img-top">
            <div class="card-body">
              <h2 class="card-title">${result.title}</h2> 
              <p class="card-text">${result.description}</p>
              <span>${bidLink}</span>
            </div>
        </div>`
        }
        
    checkImageRatio(result);
}
function checkImageRatio(result){
  let image = document.querySelector('.card-img-top');
  console.log(result.media[0]);
  console.log(image);
  console.log(image.naturalWidth);
  console.log(image.naturalHeight);
}

    

