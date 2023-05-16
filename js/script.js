import { openMenu } from "./components/menuButton.js";
const menuButton = document.querySelector('.bars');
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

if(user){
    console.log(user);
    logLink.innerHTML = "Logout";
    regLink.innerHTML = `<img src=${userAvatar} class="avatarHeaderImg" style="width:40px; border-radius:50% "/>`;
    credits.innerHTML = "Credits: NOK " + userCredits;
    divider.style = "display:none";
    profileMenuLink.style = "display:block";
    /* bidButton.innerHTML = "Make a bid"; */
    
}

menuButton.onclick = openMenu;

async function getItems(){
    const results = await fetch(baseUrl + listings);
    const response = await results.json();
    console.log(response);
    let currentSlide = response[0];
    let index = response.indexOf(currentSlide);

    for(let i = 0; i < response.length; i++){
        let bidLink = `<a href="profile.html?id=${currentSlide.id}#bid" class="bidLink">Make a bid</a>`;
        let viewBids = `<a href="profile.html?id=${currentSlide.id}#bids" class="viewBidsLink">View bids</a>`;
        slider.innerHTML = `<div class='container'>
        <div class='item'>
          <div class="left">
            <div class="leftContainer">
              <h2>${currentSlide.title}</h2>
              <p>${currentSlide.description}</p>
              <p>${bidLink}</p>
              </div>
          </div>
          <div class="right">
            <img src=${currentSlide.media[0]} alt='no image'/>
          </div>
        </div>
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
  let bidLink = `<a href="profile.html?id=${currentSlide.id}#bid" class="bidLink">Make a bid</a>`;
  let viewBids = `<a href="profile.html?id=${currentSlide.id}#bids" class="viewBidsLink">View bids</a>`;
    slider.innerHTML = `<div class='container'>
    <div class='item'>
      <div class="left">
        <div class="leftContainer">
          <h2>${currentSlide.title}</h2>
          <p>${currentSlide.description}</p>
          <p>${bidLink}</p>
        </div>
      </div>
      <div class="right">
        <img src=${currentSlide.media[0]} alt='no image'/>
      </div>
    </div>
  </div>`
}
