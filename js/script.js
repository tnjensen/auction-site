import { openMenu } from "./components/menuButton.js";
import displayMessage from "./components/displayMessage.js";
const menuButton = document.querySelector('.bars');
const registerInfo = document.querySelector('.register-info');
const listingInfo = document.querySelector('.listing-info');
const baseUrl = 'https://api.noroff.dev/api/v1/auction/';
const listings = 'listings';
const slider = document.querySelector('.slider');
const arrows = document.querySelectorAll('.arrow');
const logLink = document.querySelector('.logLink');
const regLink = document.querySelector('.regLink');
const credits = document.querySelector('.credits');
const divider = document.querySelector('.profile-divider');
const profileMenuLink = document.querySelector('.profileMenuLink');
const user = JSON.parse(localStorage.getItem('user'));
const userCredits = JSON.parse(localStorage.getItem('credits'));
const userAvatar = JSON.parse(localStorage.getItem('avatar'));
const userToken = JSON.parse(localStorage.getItem('token'));
const inputForm = document.querySelector('.inputForm');
const inputTitle = document.querySelector('.inputTitle');
const inputDesc = document.querySelector('.inputDesc');
const inputEndsAt = document.querySelector('.inputEndsAt');
const messageContainer = document.querySelector('.message-container');

messageContainer.style = "display:none";
inputForm.style = "display:none";
credits.style = "display:none";

if(user){
    console.log(user);
    logLink.innerHTML = "Logout";
    regLink.innerHTML = `<img src=${userAvatar} class="avatarHeaderImg" style="width:40px; border-radius:50% "/>`;
    credits.style = "display:block";
    credits.innerHTML = "Credits: NOK " + userCredits;
    divider.style = "display:none";
    profileMenuLink.style = "display:block";
    registerInfo.style = "display:none";
    listingInfo.style = "display:none";
    inputForm.style = "display:block";
    messageContainer.style = "display:block";
}

menuButton.onclick = openMenu;

async function getItems(){
    const results = await fetch(baseUrl + listings);
    const response = await results.json();
    /* console.log(response); */
    let currentSlide = response[0];
    let index = response.indexOf(currentSlide);

    for(let i = 0; i < response.length; i++){
      let bidLink = `<a href="profile.html?id=${currentSlide.id}#bid" class="guestBidLink">View bids</a>`;
        if(user){
          bidLink = `<a href="profile.html?id=${currentSlide.id}#bid" class="bidLink">Make a bid</a>`;
        }
        slider.innerHTML = `<div class='item'>
          <h2>${currentSlide.title}</h2>
          <img src=${currentSlide.media[0]}  alt=''/>
          <p>${currentSlide.description}</p>
          <h3>${bidLink}</h3>
    </div>`
    }
    arrows.forEach(element => {
        element.onclick = function(){
            if(element.classList.contains('left')){
                index += 1;
                if(index > response.length) {
                    index = response.length - 1;
                }
                currentSlide = response[index];
                moveCarousel(index, currentSlide);
                
            }
            else{
                index -= 1;
                if(index < 0) {
                    index = 0;
                }
                currentSlide = response[index];
                moveCarousel(index, currentSlide);
            }
        }
    })
};
getItems();

function moveCarousel(index, currentSlide){
  let bidLink = `<a href="login.html" class="guestBidLink">View bids</a>`;
        if(user){
          bidLink = `<a href="profile.html?id=${currentSlide.id}#bid" class="bidLink">Make a bid</a>`;
        }
        slider.innerHTML = `<div class='item'>
          <h2>${currentSlide.title}</h2>
          <img src=${currentSlide.media[0]} alt=''/> 
          <p>${currentSlide.description}</p>
          <h3>${bidLink}</h3>
        </div>`
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
  console.log(data);

      fetch(url, options)
      .then( response => {
        if (response.status === 201)
        displayMessage("success", "Successfully added new listing " , ".message-container");
        console.log(response);
      })
      .catch(error =>  displayMessage("warning", json.errors[0].message, ".message-container"));
}
    