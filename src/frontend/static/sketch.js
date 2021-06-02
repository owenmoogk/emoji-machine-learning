var grid; // assigned by clearDrawing()
var gridSize = 28; // how many colums/rows to have
var cellSize; // calculated by resetCellSize()
var timeSinceGuess = 0;
var bgColor; // assign in setup()
var drawColor; // assign in setup()
var maxCanvasSize = 500; // keep canvas from getting too big
var minCanvasSize = 200; // keep canvas from getting too small
var canvasSize; // updated by resetCanvasSize()

// REQUIRED P5.JS FUNCTIONS
function setup() {
	resetCanvasSize();
	createCanvas(canvasSize, canvasSize);
	resetCellSize();
	clearDrawing();
	bgColor = color(50, 50, 50); // dark gray
	drawColor = color(50, 170, 200); // teal
}

function draw() {
	background(bgColor);
	noStroke();
	drawGrid(grid);
}1

// resize on window change
function windowResized() {
	resetCanvasSize();
	resizeCanvas(canvasSize, canvasSize);
	resetCellSize();
}

function resetCanvasSize() {
	canvasSize = max(min(windowWidth - 60, maxCanvasSize), minCanvasSize);
}

function resetCellSize() {
	cellSize = width / gridSize;
}

// CANVAS UPDATES
function drawGrid(grid) {
	for (var column = 0; column < grid.length; column++) {
		for (var row = 0; row < grid[0].length; row++) {
			var cellValue = grid[column][row];
			if (cellValue > 0) {
				drawColor.setAlpha(cellValue * 255)
				fill(drawColor);
			} else {
				fill(bgColor);
			}
			rect(column * cellSize, row * cellSize + 1, cellSize, cellSize);
		}
	}
}

function addToDrawing() {
	var cellLoc = getcellLoc(mouseX, mouseY);
	grid[cellLoc[0]][cellLoc[1]] = 1;
}

function resetGrid() {
	if (!grid) {
		grid = new Array(gridSize);
		for (var i = 0; i < grid.length; i++) {
			grid[i] = new Array(gridSize);
		}
	}
	for (var column = 0; column < grid.length; column++) {
		for (var row = 0; row < grid[0].length; row++) {
			grid[column][row] = 0;
		}
	}
}

// USER INTERACTIONS
function mouseDragged() {
	if (onCanvas()) {
		addToDrawing();
		if (timeSinceGuess > 50) {
			getPrediction();
			timeSinceGuess = 0;
		} else {
			timeSinceGuess += 1;
		}
		return false;
	}
}

function clearDrawing() {
	resetGrid();
	document.getElementById("guess").innerHTML = "None";
	getTrainingNumber()
}

// HELPERS
function onCanvas() {
	return (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY < height)
}

function getcellLoc(x, y) {
	var col = floor(x / cellSize);
	var row = floor(y / cellSize);
	col = max(min(col, gridSize - 1), 0);
	row = max(min(row, gridSize - 1), 0);

	return [col, row];
}

// HTTP REQUESTS
function train(emojiValue) {
	dataString = JSON.stringify({ label: emojiValue, features: grid });
	fetch("/ai/train/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: dataString
	})
	.then(clearDrawing())
}

function getTrainingNumber() {
	fetch("/ai/getDataStats/")
		.then(response => response.json())
		.then(json => {
			document.getElementById("numberOfData").innerHTML = json.length;
		})
}

function getPrediction() {
	timeSinceGuess = 0;
	fetch("/ai/guess/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify({ features: grid })
	})
		.then(response => response.json())
		.then(json => {
			if (json.guess){
				document.getElementById("guess").innerHTML = json.guess;
			}
		})
}

function deleteSamples() {
	fetch("/ai/delete/", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken')
		},
		body: JSON.stringify({ deletion: "requested" })
	})
	.then(clearDrawing())
}

// for requests
function getCookie(name) {
	if (!document.cookie) {
		return null;
	}
	const xsrfCookies = document.cookie.split(';')
		.map(c => c.trim())
		.filter(c => c.startsWith(name + '='));

	if (xsrfCookies.length === 0) {
		return null;
	}
	return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}