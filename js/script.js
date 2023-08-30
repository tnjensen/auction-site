import { openMenu } from "./components/menuButton.js";
import displayMessage from "./components/displayMessage.js";
const menuButton = document.querySelector('.bars');
const registerInfo = document.querySelector('.register-info');
const listingInfo = document.querySelector('.listing-info');
const baseUrl = 'https://api.noroff.dev/api/v1/auction/';
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
const angles = document.querySelectorAll('i');

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
    regLink.innerHTML = `<img src=${userAvatar} class="avatarHeaderImg" style="width:40px; border-radius:50% "/>`;
    credits.innerHTML = "Credits: NOK " + userCredits;
    divider.style = "display:none";
    registerInfo.style = "display:none";
    listingInfo.style = "display:none";
    inputForm.style = "display:block";
    messageContainer.style = "display:block";
}

menuButton.onclick = openMenu;
window.onresize = detectViewport();

async function getItems(){
    try{
        const response = await fetch(baseUrl + listings);
        const results = await response.json();  
        slider.innerHTML = "";
        loader.innerHTML = "";
        postResult = results;
        loader.classList.remove('loading-indicator');
        let currentSlide = results[0];
        index = results.indexOf(currentSlide);
        getMaxPages(results);
        createHTML(results);
        
        angles.forEach(element => {
          element.onclick = function(){
            if(element.classList.contains('fa-angle-right')){
                slider.innerHTML = "";
                index += 1;
                if(index >= results.length/postsPerPage) {
                    index -= 1;
                }
                postPage = index + 1;
                buildPage(postResult);
            }
            else{
                slider.innerHTML = "";
                index -= 1;
                if(index < 0) {
                    index = 0;
                }
                postPage = index + 1;
                buildPage(postResult);
            }
        }
    })
    }
    catch(error){
      slider.innerHTML = "Error: " + error;
    }
}
getItems();

function buildPage(results){
    let indexStart = index * postsPerPage;
    let indexEnd = indexStart + postsPerPage;
    pageResult = results.slice(indexStart, indexEnd);
    createHTML(pageResult);
}

function createHTML(results){ 
    for(let i = 0; i < postsPerPage; i++){ 
        if(!results[i]){
            break;
        }else{
          let bidLink = `<a href="profile.html?id=${results[i].id}#bid" class="btn btn-secondary">View bids</a>`;
          if(user){
            bidLink = `<a href="profile.html?id=${results[i].id}#bid" class="btn btn-secondary">Make a bid</a>`;
          }
          slider.innerHTML += `<div class="card">
          <div class="embed-responsive embed-responsive-16by9">
              <img src=${results[i].media[0]}  alt='item image' class="card-img-top embed-responsive-item">
          </div>
          <div class="card-body">
              <h2 class="card-title">${results[i].title}</h2> 
              <p class="card-text">${results[i].description}</p>
              <span>${bidLink}</span>
          </div>
        </div>`
        }
    } 
    checkLength(results);
}
function checkLength(results){
  let nodeList = document.querySelectorAll('.card-text');

    for(let i = 0; i < nodeList.length; i++){
        if(results[i].description.length > 70){
          nodeList[i].classList.add('long');
        }
      }
}

inputForm.addEventListener('submit', handleSubmit);

function handleSubmit(event){
  event.preventDefault();

  const inputTitleValue = inputTitle.value.trim();
  const inputDescValue = inputDesc.value.trim();
  const inputEndsAtValue = inputEndsAt.value.trim();
  const inputMediaValues = [
        "https://admirable-concha-83ef4e.netlify.app/images/kitchen3.png",
        "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        "http://www.gravatar.com/avatar/34bf7beba6a1cd62123ffe496779fb18.jpg",
        "https://admirable-concha-83ef4e.netlify.app/images/kitchen3.png"
      ]
    
    if(inputTitleValue.length === 0 && inputEndsAtValue.length === 0){
      return displayMessage("warning", "Please add a title and end date", 
      ".message-container");
    }
    addListing(inputTitleValue, inputDescValue, inputEndsAtValue, inputMediaValues);
}

async function addListing(inputTitleValue,inputDescValue,inputEndsAtValue,
  inputMediaValues){
  const url = baseUrl + listings;

  const data = JSON.stringify({title:inputTitleValue, description:inputDescValue,
    endsAt:inputEndsAtValue, media:inputMediaValues});

  const options = {
      method: "POST",
      body: data,
      headers : {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      }
  };

  fetch(url, options)
  .then( response => {
    if (response.status === 201)
    displayMessage("success", "Successfully added new listing " , ".message-container");
    console.log(response);
  })
  .catch(error =>  displayMessage("warning", json.errors[0].message, ".message-container"));
}
    
function detectViewport(){
  if(window.innerWidth < mobile){
      postsPerPage = 1; 
  }
  if(window.innerWidth <= tablet && window.innerWidth > mobile){
    postsPerPage = 2; 
  }
  if(window.innerWidth <= desktop && window.innerWidth > tablet){
    postsPerPage = 3; 
  }
  if(window.innerWidth > desktop){
      postsPerPage = 4;
  }
  if(window.innerWidth >= large){
      postsPerPage = 5;
  }
  
  if(window.innerHeight <= height){
      postsPerPage = 2; 
  }
  return postsPerPage;
}

function getMaxPages(results){
  maxPages = results.length/postsPerPage;
  if(results.length % postsPerPage != 0){
      maxPages += 1;
  }
  maxPages = Math.trunc(maxPages);
  return maxPages;
}