const tokenKey = "token";
const userKey = "user";
const creditKey = "credits";
const avatarKey = "avatar";
const bidKey = "bids";

export function saveBid(bid){
    saveToStorage(bidKey, bid);
}
export function getBid(){
    return getFromStorage(bidKey);
}
export function saveAvatar(avatar){
    saveToStorage(avatarKey, avatar);
}
export function getAvatar(){
    return getFromStorage(avatarKey);
}
export function saveCredits(credits){
    saveToStorage(creditKey, credits);
}
export function getCredits(){
    return getFromStorage(creditKey);
}
export function saveToken(token){
    saveToStorage(tokenKey, token);
}
export function getToken(){
    return getFromStorage(tokenKey);
}
export function getUser(){
    const user = getFromStorage(userKey);

    if(user){
        return user.email;
    }
    return null;
}
export function saveUser(user){
    saveToStorage(userKey, user);
}
function saveToStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key){
    const value = localStorage.getItem(key);

    if(!value){
        return [];
    }
    else{
        return JSON.parse(value);
    }
}
export function clearStorage(){
    localStorage.clear();
}