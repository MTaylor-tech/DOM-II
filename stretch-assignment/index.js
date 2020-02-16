const allBlocks = document.querySelectorAll('.block');
let topOfStack = 100;
let lefty = [];
let myTimer = [];
let currentlyMoving = 0;

for (let i=0; i<allBlocks.length; i++) {
	allBlocks[i].style.order = 100 + i;
	allBlocks[i].style.left = 0;
	allBlocks[i].style.position = `relative`;
	lefty[i] = 0;
}

function clickBlock (index) {
	allBlocks[index].style.order = topOfStack - 1;
	topOfStack--;
}

function moveRight (index) {
	currentlyMoving = index;
	stop();
	console.log(`moveRight: ${index}`);
	myTimer[index] = window.setInterval(stepRight, 10, index);
}

function stepRight (index) { 
	leftyString = allBlocks[index].style.left.replace('px', '');
	lefty[index] = parseInt(leftyString, 10);
	lefty[index]++;
	allBlocks[index].style.left = `${lefty[index]}px`;
	console.log(`stepRight: ${index}, ${allBlocks[index].style.left}`);
	if (lefty[index] >= 800) {
		stop();
	} 
}

function moveLeft (index) {
	currentlyMoving = index;
	console.log(`moveLeft: ${index}`);
	myTimer[index] = window.setInterval(stepLeft, 20, index);
}

function stepLeft (index) { 
	leftyString = allBlocks[index].style.left.replace('px', '');
	lefty[index] = parseInt(leftyString, 10);
	lefty[index]--;
	allBlocks[index].style.left = `${lefty[index]}px`;
	console.log(`stepLeft: ${index}, ${allBlocks[index].style.left}`);
	if (lefty[index] <= 0) {
		stop();
	} 
}

function stop () {
	window.clearInterval(myTimer[currentlyMoving]);
}

function startLeft() {
	stop();
	moveLeft(currentlyMoving);
}

allBlocks.forEach(function (block, index) { block.addEventListener('click', clickBlock.bind(null, index)); }, false);
allBlocks.forEach(function (block, index) { block.addEventListener('mousedown', moveRight.bind(null, index)); }, false);
window.addEventListener('mouseup', startLeft);
