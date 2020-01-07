// Your code goes here

// Selectors and variables
const allImages = document.querySelectorAll('.img-content img');
const allImageBoxes = document.querySelectorAll('.img-content');
const firstImage = document.getElementById('fb-img');
const navItems = document.querySelectorAll('.nav-link');
const buttons = document.querySelectorAll('.btn');

// Functions
function fadeIn () {
    firstImage.style.opacity = 1;
}

function fadeOut () {
    firstImage.style.opacity = 0.3;
}

function loaded () {
    gsap.to(allImages[0], {duration: 0, x: 1000});
    gsap.to(allImages[1], {duration: 0, x: -1000});
}

function returnImgs (index) {
    gsap.to(allImages[index], {duration: 2, x: 0});
}

function pressButton () {
    alert('Awesome! Time to get started!');
}

function fontChange () {
    navItems.forEach(function (item) { item.style.color = 'red'; });
}
function fontChangeBack () {
    navItems.forEach(function (item) { item.style.color = 'black'; });
}

// Add Event Listeners
firstImage.addEventListener('mouseout', fadeIn);
firstImage.addEventListener('mouseover', fadeOut);
navItems.forEach(function (item) { item.addEventListener('mouseenter', fontChange); });
navItems.forEach(function (item) { item.addEventListener('mouseleave', fontChangeBack); });
buttons.forEach(function (button) { button.addEventListener('click', pressButton); });
window.addEventListener('load', loaded);
allImageBoxes.forEach(function (box, index) { box.addEventListener('mouseover', returnImgs.bind(null, index)); }, false);
