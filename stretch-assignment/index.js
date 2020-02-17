const allBlocks = document.querySelectorAll('.block');
let topOfStack = 100;
let lefty = [];
let myTimer = [];
let myUpTimer = [];
const topTop = 70;
const rightLimit = 800;
let measurements = [];
let positions = [];

for (let i=0; i<allBlocks.length; i++) {
	allBlocks[i].style.order = 100 + i;
	allBlocks[i].style.left = `0px`;
	allBlocks[i].style.top = `${topTop + (i*120)}px`;
	measurements[i] = `${topTop + (i*120)}px`;
	allBlocks[i].style.position = `absolute`;
	allBlocks[i].style.zIndex = 0;
	lefty[i] = 0;
	positions[i] = i;
}

function clickBlock (index, event) {
	stopAll();
	moveUp(index);
}

function moveRight (index) {
	stopOne(index);
	console.log(`moveRight: ${index}`);
	myTimer[index] = window.setInterval(stepRight, 10, index);
}

function stepRight (index) { 
	const leftyString = allBlocks[index].style.left.replace('px', '');
	lefty[index] = parseInt(leftyString, 10);
	lefty[index]++;
	allBlocks[index].style.left = `${lefty[index]}px`;
	console.log(`stepRight: ${index}, ${allBlocks[index].style.left}`);
	if (lefty[index] >= rightLimit) {
		stopOne(index);
		allBlocks[index].style.left = `${rightLimit}px`;
	} 
}

function moveLeft (index) {
	console.log(`moveLeft: ${index}`);
	myTimer[index] = window.setInterval(stepLeft, 20, index);
}

function stepLeft (index) { 
	let leftyString = allBlocks[index].style.left.replace('px', '');
	lefty[index] = parseInt(leftyString, 10);
	lefty[index]--;
	allBlocks[index].style.left = `${lefty[index]}px`;
	console.log(`stepLeft: ${index}, ${allBlocks[index].style.left}`);
	if (lefty[index] <= 0) {
		stopOne(index);
		allBlocks[index].style.left = `0px`;
	} 
}

function moveUp (index) {
	console.log(`moveUp: ${index}`);
	allBlocks[index].style.zIndex = 1;
	myTimer[index] = window.setInterval(stepUp, 20, index);
}

function stepUp (index) { 
	let uppityString = allBlocks[index].style.top.replace('px', '');
	let uppity = parseInt(uppityString, 10);
	uppity--;
	allBlocks[index].style.top = `${uppity}px`;
	allBlocks[index].style.left = `0px`;
	console.log(`stepUp: ${index}, ${allBlocks[index].style.top}`);
	if (uppity <= topTop) {
		stopAll();
		allBlocks[index].style.zIndex = 0;
		allBlocks[index].style.top = `${topTop}px`;
		allBlocks[index].style.order = topOfStack - 1;
		const oldPos = [...positions];
		console.log(oldPos);
		let n = oldPos.indexOf(index);
		if (n>0) {
			positions[0] = oldPos[n];
			for (i=0; i<n; i++) {
				positions[i+1] = oldPos[i];
			}
			for (i=0; i<allBlocks.length; i++) {
				allBlocks[positions[i]].style.top = measurements[i];
				allBlocks[i].style.left = `0px`;
			}
		}
		console.log(positions);
		topOfStack--;
	} 
}

function stopAll () {
	for (let i=0; i<myTimer.length; i++) {
		window.clearInterval(myTimer[i]);
		window.clearInterval(myUpTimer[i]);
	}
}

function stopHorizontal () {
	for (let i=0; i<myTimer.length; i++) {
		window.clearInterval(myTimer[i]);
	}
}

function stopOne (index) {
	window.clearInterval(myTimer[index]);
}

function stopUp (index) {
	window.clearInterval(myUpTimer[index]);
}

function startLeft() {
	// stopAll();
	stopHorizontal();
	for (let i=0; i<allBlocks.length; i++) {
		leftyString = allBlocks[i].style.left.replace('px', '');
		lefty[i] = parseInt(leftyString, 10);
		if (lefty[i] > 0) {
			moveLeft(i);
		} else {
			stopOne(i);
		}
	}
}

allBlocks.forEach(function (block, index) { block.addEventListener('click', clickBlock.bind(null, index)); }, false);
allBlocks.forEach(function (block, index) { block.addEventListener('mousedown', moveRight.bind(null, index)); }, false);
window.addEventListener('mouseup', startLeft);
