import displayMessage from "../js/components/displayMessage.js";
import { clearStorage} from "../js/components/storage.js";

const logoutButton = document.querySelector('.logLink');

logoutButton.onclick = function(){
    clearStorage();
}