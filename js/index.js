// Your code goes here

// Selectors and variables
const allImages = document.querySelectorAll('img');
const contentImages = document.querySelectorAll('.img-content img');
const contentImageBoxes = document.querySelectorAll('.img-content');
const firstImage = document.getElementById('fb-img');
const navItems = document.querySelectorAll('.nav-link');
const buttons = document.querySelectorAll('.btn');
const allH2s = document.querySelectorAll('h2');
const allPs = document.querySelectorAll('p');
const allDivs = document.querySelectorAll('div');
let fullSize = true;
let psBlue = false;
let divsHighlighted = false;

let h2Selected = [];
for (let i=0; i<allH2s.length; i++) {
  h2Selected.push(false);
}

let pSelected = [];
for (let i=0; i<allPs.length; i++) {
  pSelected.push(false)
}

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

function fontChangePs () {
    let color = 'blue';
    if (psBlue === true) {
      color = 'black';
    }
    psBlue = !psBlue;
    allPs.forEach(function (p) { p.style.color = color; });
}

function highlightP (index, event) {
    if (pSelected[index]) {
      allPs[index].style.background = '';
    } else {
      allPs[index].style.background = 'yellow';
    }
    pSelected[index] = !pSelected[index];
    event.stopPropagation();
}

function highlightDivs () {
    let color = 'white';
    if (divsHighlighted) {
      allDivs.forEach(function (div) { div.style.background = 'white'});
    } else {
      allDivs.forEach(function (div) { div.style.background = 'purple'});
      color = 'purple';
    }
    allPs.forEach(function (p, index) { if (!pSelected[index]) { p.style.background = ''; }});
    buttons.forEach(function (btn) { btn.style.background = ''});
    divsHighlighted = !divsHighlighted;
}

function fontChangeH2 (index) {
    console.log(`${index}: ${h2Selected[index]}`);
    if (h2Selected[index]) {
       allH2s[index].style.direction = 'initial';
    } else {
      allH2s[index].style.direction = 'rtl';
    }
    h2Selected[index] = !h2Selected[index];
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
window.addEventListener('resize', fontChangePs);
allH2s.forEach(function (h2, index) { h2.addEventListener('dblclick', fontChangeH2.bind(null, index)); }, false);
window.addEventListener('contextmenu', fontChangePs);
allPs.forEach(function (p, index) { p.addEventListener('dragstart', highlightP.bind(null, index)); }, false);
allDivs.forEach(function (div) { div.addEventListener('dragstart', highlightDivs); });
