const links = document.querySelectorAll('nav a');
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

addClass();

;