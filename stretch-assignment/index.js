const allBlocks = document.querySelectorAll('.block');
let topOfStack = 100;
let lefty = 0;
let myTimer;

for (let i=0; i<allBlocks.length; i++) {
	allBlocks[i].style.order = 100 + i;
	allBlocks[i].style.left = 0;
}

function clickBlock (index) {
	allBlocks[index].style.order = topOfStack - 1;
	topOfStack--;
}

function moveRight (index) {
	console.log(`moveRight: ${index}`);
	myTimer = window.setInterval(stepRight, 10, index);
}

function stepRight (index) { 
	lefty++;
	allBlocks[index].style.left = `${lefty}px`;
	console.log(`stepRight: ${index}, ${allBlocks[index].style.left}`); 
}

function stop () {
	window.clearInterval(myTimer);
	lefty = 0;
}

allBlocks.forEach(function (block, index) { block.addEventListener('click', clickBlock.bind(null, index)); }, false);
allBlocks.forEach(function (block, index) { block.addEventListener('mousedown', moveRight.bind(null, index)); }, false);
allBlocks.forEach(function (block, index) { block.addEventListener('mouseup', stop); });
