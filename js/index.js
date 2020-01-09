// Your code goes here

// Selectors and variables
const allImages = document.querySelectorAll('img');
const contentImages = document.querySelectorAll('.img-content img');
const contentImageBoxes = document.querySelectorAll('.img-content');
const firstImage = document.getElementById('fb-img');
const navItems = document.querySelectorAll('.nav-link');
const buttons = document.querySelectorAll('.btn');
let fullSize = true;

// Functions
function fadeIn () {
    firstImage.style.opacity = 1;
}

function fadeOut () {
    firstImage.style.opacity = 0.3;
}

function loaded () {
    gsap.to(contentImages[0], {duration: 0, x: 1000});
    gsap.to(contentImages[1], {duration: 0, x: -1000});
}

function returnImgs (index) {
    gsap.to(contentImages[index], {duration: 2, x: 0});
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
function changeFirstImage() {
    if (fullSize) {
        gsap.to(firstImage, {duration: 2, scale: 0.2, ease:'bounce'});
        fullSize = false;
    } else {
        gsap.to(firstImage, {duration: 2, scale: 1, ease:'bounce'});
        fullSize = true;
    }
}
function rotateImages () {
    allImages.forEach(function (image) { gsap.to(image, {duration: 1, rotation: 360}); });
}

// Add Event Listeners
firstImage.addEventListener('mouseout', fadeIn);
firstImage.addEventListener('mouseover', fadeOut);
window.addEventListener('keydown', changeFirstImage);
navItems.forEach(function (item) { item.addEventListener('mouseenter', fontChange); });
navItems.forEach(function (item) { item.addEventListener('mouseleave', fontChangeBack); });
buttons.forEach(function (button) { button.addEventListener('click', pressButton); });
window.addEventListener('load', loaded);
contentImageBoxes.forEach(function (box, index) { box.addEventListener('mouseover', returnImgs.bind(null, index)); }, false);
window.addEventListener('wheel', rotateImages);
