import displayMessage from "../js/components/displayMessage.js";
import { baseUrl } from "../js/components/settings.js";
import { saveCredits, saveToken, saveUser, saveAvatar} from "../js/components/storage.js";
const menuButton = document.querySelector('.bars');
const loginEmail = document.querySelector('.loginEmail');
const loginPassword = document.querySelector('.loginPassword');
const submitButton = document.querySelector('.loginButton');
const form = document.querySelector('.loginBox');
const message = document.querySelector('.message-container');
const logLink = document.querySelector('.logLink');

const year = document.getElementById('year');

let date = new Date().getFullYear();
if( date > 2023){
  year.innerHTML = `2023 - `+ date;
}else{
  year.innerHTML = date;
}

menuButton.style = "display:none";

form.addEventListener('submit', submitForm);

function submitForm(event){
    event.preventDefault();

    message.innerHTML = "";

    const loginEmailValue = loginEmail.value.trim();
    const loginPasswordValue = loginPassword.value.trim();

    if(loginEmailValue.length === 0 || loginPasswordValue.length === 0){
        return displayMessage("warning", "Invalid values", ".message-container");
    }

    doLogin(loginEmailValue, loginPasswordValue);
}

async function doLogin(loginEmailValue,loginPasswordValue){
    const url = baseUrl + "auth/login";

    const data = JSON.stringify({email:loginEmailValue, password:loginPasswordValue});

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
           /*  displayMessage("success", "Successfully logged in as " + json.name, ".message-container"); */
            console.log(json.accessToken);
            const token = json.accessToken;
            saveToken(token);
            const user = json.name;
            saveUser(user);
            const credits = json.credits;
            saveCredits(credits);
            const avatar = json.avatar;
            saveAvatar(avatar);
            logLink.innerHTML = "Logout";
        }
        if(json.error){
            displayMessage("warning", json.error.message, ".message-container");
        }
        else{
        //Redirect to homepage if successful login
             /* submitButton.innerHTML = "Home page";
             submitButton.onclick = function(){ */
                location.href = "/";
           /*   }    */
           
        }
        
    }
    catch(error){
        return displayMessage("error", "Wrong username or password", ".message-container");
    }
}