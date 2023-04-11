const links = document.querySelectorAll('nav a');
const navItems = document.querySelectorAll('.header li');
const burger = document.querySelector('.burger');
const navList = document.querySelector('.header ul');
const closeButton = document.querySelector('img[alt="close"]');

function addClass() {
    links.forEach(item => {
        item.addEventListener('click', (e) => {
            removeClass();
            e.target.classList.add('active');
        })
    })
}
function removeClass() {
    links.forEach(item => {
        item.classList.remove('active');
    })
}

function addBurger() {
    if (window.innerWidth <= 600) {
        burger.classList.remove('hidden');
        navItems.forEach(item => {
            item.classList.add('hidden');
        });
    };
}

function showBurgerList() {
    burger.addEventListener('click', (e) => {
        navList.setAttribute('id', 'new-nav');
        closeButton.classList.remove('hidden')
        navItems.forEach(item => {
            item.classList.remove('hidden');
        });
    });
}

function hideBurgerList() {
    navList.addEventListener('click', () => {
         navList.removeAttribute('id');
        closeButton.classList.add('hidden')
        navItems.forEach(item => {
            item.classList.add('hidden');
        });
    })
}

addClass();
addBurger();
showBurgerList();
hideBurgerList();