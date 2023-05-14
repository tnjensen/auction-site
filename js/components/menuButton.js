const menuButton = document.querySelector(".bars");
const header = document.querySelector('.header');

export function openMenu(){
    /* alert('click'); */
    header.classList.toggle('active');
}