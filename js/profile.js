import { baseUrl } from "./components/settings.js";
import displayMessage from "../js/components/displayMessage.js";
import { openMenu } from "./components/menuButton.js";
import { saveAvatar } from "./components/storage.js";
const profileUser = document.querySelector('.profileUser');
const profileCredits = document.querySelector('.profileCredits');
const editButton = document.querySelector('.editButton');
const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));
const avatar = JSON.parse(localStorage.getItem('avatar'));
const profileAvatarLink = document.querySelector('.profileAvatarLink');
const profileAvatar = document.querySelector('.profileAvatar');
const menuButton = document.querySelector('.bars');
const credits = JSON.parse(localStorage.getItem('credits'));
const profileForm = document.querySelector('.profileBox');
const logLink = document.querySelector('.logLink');
const regLink = document.querySelector('.regLink');
const divider = document.querySelector('.profile-divider');
const message = document.querySelector('.message-container');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const itemId = params.get("id");
const bidItem = document.querySelector('.bidItem');
const bidDescription = document.querySelector('.bidDesc');
const bidForm = document.querySelector('.bidBox');
const bidAmount = document.querySelector('.bidAmount');
const bidsOnItem = document.querySelector('.bidsOnItem');

if(user){
    profileUser.innerHTML = user;
    profileCredits.innerHTML = "NOK " + credits;
    logLink.innerHTML = "Logout";
    divider.style = "display:none";
}


menuButton.onclick = openMenu;

async function getBidItem(){

    const options = {
        headers: {
            Authorization: "Bearer " + token,
        },
    }
    try{
        const result = await fetch(baseUrl + "listings/" + itemId, options);
        const response = await result.json();
        
        console.log(response);

        bidItem.innerHTML = response.title;
        
        bidDescription.innerHTML = response.description;

        if(bidDescription.innerHTML === ""){
            bidDescription.style.backgroundColor = "inherit";
        }

        bidsOnItem.innerHTML = response._count.bids;
        
    }
    catch(err){
        console.log(err);
        
    }
   
}
if(itemId){
    getBidItem();
}
else{
    if(bidItem.innerHTML === "" && bidDescription.innerHTML === "" && bidsOnItem.innerHTML === ""){
        bidItem.style.backgroundColor = "inherit";
        bidDescription.style.backgroundColor = "inherit";
        bidsOnItem.style.backgroundColor = "inherit";
    }
}


profileAvatar.src = avatar;
profileAvatar.style = "width:80px; border-radius:50%; margin-left:10px"; 
regLink.innerHTML = `<img src=${avatar} style="width:40px; border-radius:50% "/>`;
profileAvatarLink.value = `${avatar}`;


profileForm.addEventListener('submit', submitProfileForm);

function submitProfileForm(event){
    event.preventDefault();

    message.innerHTML = "";

    let profileAvatarLinkValue = profileAvatarLink.value;
    console.log(profileAvatarLinkValue);
    
    if(profileAvatarLinkValue.length === 0){
        profileAvatarLinkValue = "";    
    }
   

    doUpdate(profileAvatarLinkValue);
}
async function doUpdate(profileAvatarLinkValue){
    const url = baseUrl + `profiles/${user}/media`;

    const data = JSON.stringify({avatar:profileAvatarLinkValue});
    console.log(profileAvatarLinkValue);
    
    const options = {
        method: "PUT",
        body: data,
        headers : {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    };

    try{
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        
        if(response.ok){
            displayMessage("success", "Successfully updated avatar for " + json.name, ".message-container");
            const avatar = json.avatar;
            saveAvatar(avatar);
            console.log(avatar);
            
        }
        if(json.error){
            displayMessage("warning", json.error.message, ".message-container");
        }
        else{
        //Redirect to homepage if successful update
             editButton.innerHTML = "Home page";
             editButton.onclick = function(){
                location.href = "/";
             }   
           
        }
        
    }
    catch(error){
        return displayMessage("error", "Wrong username or password", ".message-container");
    }
}

bidForm.addEventListener('submit', submitBidForm);

function submitBidForm(event){
    event.preventDefault();

    message.innerHTML = "";

    let bidAmountValue = bidAmount.value;
    console.log(bidAmountValue);
    
    if(bidAmountValue.length === 0){
        displayMessage("warning", "Please enter valid bid amount", ".bid-message-container"); 
    }
   
    placeBid(bidAmountValue);
}
async function placeBid(bidAmountValue){
    const url = baseUrl + `listings/${itemId}/bids`;

    const data = JSON.stringify({amount:parseInt(bidAmountValue)});
    console.log(bidAmountValue);
    
    const options = {
        method: "POST",
        body: data,
        headers : {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    };

    try{
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        
        if(response.ok){
            displayMessage("success", "Successfully placed bid for " + json.title, ".bid-message-container");
            const bid = json.bids.amount;
            saveBid(bid);
            console.log(bid);
            
        }
        if(json.errors){
            displayMessage("warning", json.errors[0].message, ".bid-message-container");
            
        }
        else{
        //Redirect to homepage if successful update
             bidButton.innerHTML = "Go back";
             bidButton.onclick = function(){
                location.href = "/";
             }   
           
        }
        
    }
    catch(error){
        return displayMessage("error", "Something went wrong, please try again.. ", ".bid-message-container");
    }
}
