import { clearStorage} from "../js/components/storage.js";

const logoutButton = document.querySelector('.logLink');

logoutButton.onclick = function(){
    clearStorage();
}