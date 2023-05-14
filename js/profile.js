import { baseUrl } from "./components/settings.js";
import displayMessage from "../js/components/displayMessage.js";
const profileUser = document.querySelector('.profileUser');
const profileCredits = document.querySelector('.profileCredits');
const editButton = document.querySelector('.editButton');
const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));
const avatar = JSON.parse(localStorage.getItem('avatar'));
const profileAvatarLink = document.querySelector('.profileAvatarLink');
const profileAvatar = document.querySelector('.profileAvatar');
import { openMenu } from "./components/menuButton.js";
const menuButton = document.querySelector('.bars');
const credits = JSON.parse(localStorage.getItem('credits'));
const form = document.querySelector('.profileBox');
const logLink = document.querySelector('.logLink');
const regLink = document.querySelector('.regLink');
const divider = document.querySelector('.profile-divider');

profileUser.innerHTML = user;
profileCredits.innerHTML = "NOK " + credits;
logLink.innerHTML = "Logout";
divider.style = "display:none";

menuButton.onclick = openMenu;

async function getProfile(){

    const options = {
        headers: {
            Authorization: "Bearer " + token,
        },
    }
    try{
        const result = await fetch(baseUrl + "profiles/" + user, options);
        const response = await result.json();
        
        console.log(response);

        
        
       
    }
    catch(err){
        console.log(err);
        
    }
   
}
getProfile();

profileAvatar.src = avatar;
profileAvatar.style = "width:80px; border-radius:50%; margin-left:10px";
profileAvatarLink.innerHTML = avatar;
regLink.innerHTML = `<img src=${avatar} style="width:40px; border-radius:50% "/>`;


form.addEventListener('submit', submitForm);

function submitForm(event){
    event.preventDefault();

    message.innerHTML = "";

    const avatarValue = user.name;

    doUpdate(nameValue);
}
async function doUpdate(){
    const url = baseUrl + `profile/${user}/media`;

    const data = JSON.stringify({name:nameValue});

    const options = {
        method: "PUT",
        body: data,
        headers : {
            "Content-Type": "application/json"
        }
    };

    try{
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        
        if(response.ok){
            displayMessage("success", "Successfully updated avatar for " + json.name, ".message-container");
            const user = json.name;
            saveUser(user);
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