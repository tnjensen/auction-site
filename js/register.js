import { openMenu } from "./components/menuButton.js";
import displayMessage from "../js/components/displayMessage.js";
import { baseUrl } from "../js/components/settings.js";
import { saveCredits, saveUser, saveAvatar } from "../js/components/storage.js";
const menuButton = document.querySelector('.bars');
const registerName = document.querySelector('.registerName');
const registerEmail = document.querySelector('.registerEmail');
const registerPassword = document.querySelector('.registerPassword');
const registerAvatar = document.querySelector('.registerAvatar');
const submitButton = document.querySelector('.signUpButton');
const form = document.querySelector('.registerBox');
const message = document.querySelector('.message-container');

const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2023){
  year.innerHTML = `2023 - `+ date;
}else{
  year.innerHTML = date;
}

menuButton.onclick = openMenu;

form.addEventListener('submit', submitForm);

async function submitForm(event){
    event.preventDefault();
    
    message.innerHTML = "";

    const registerNameValue = registerName.value.trim();
    const registerEmailValue = registerEmail.value.trim();
    const registerPasswordValue = registerPassword.value.trim();
    const registerAvatarValue = registerAvatar.value.trim();

    if(registerNameValue.length === 0 || registerEmailValue.length === 0 || registerPasswordValue.length === 0){
        return displayMessage("warning", "Invalid values", ".message-container");
    }

    await doLogin(registerNameValue, registerEmailValue, registerPasswordValue, registerAvatarValue);
}

async function doLogin(registerName,registerEmail,registerPassword, registerAvatar){
    const url = baseUrl + "auth/register";

    const data = JSON.stringify({name:registerName, email: registerEmail, password:registerPassword, avatar:registerAvatar});

    const options = {
        method: "POST",
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
            displayMessage("success", "Successfully registered as " + json.name, ".message-container");
            
            const credits = json.credits;
            saveCredits(credits);
            const user = json.name;
            saveUser(user);
            const avatar = json.avatar;
            saveAvatar(avatar);
        }
        if(json.error){
            displayMessage("warning", json.error.message, ".message-container");
        }
        else{
        //Redirect to homepage if successful registration
             submitButton.innerHTML = "Log in";
             submitButton.onclick = function(){
                location.href = "login.html";
             }   
           
        }
        
    }
    catch(error){
        return displayMessage("error", "Wrong username or password", ".message-container");
    }
}