let ROWS = COLS = 7;
let MAIN_CONTAINER_DIMENSIONS = 500; // width and height of main container box, in px

let tiles = null; // array of Tile objects
const container = document.querySelector("#main-container");
const newSketchButton = document.querySelector('#new-sketch-button');
const sketchModeCheckbox = document.getElementById('sketch-mode-checkbox');
const coloringStyleSelection = document.getElementById('coloring-style-selection');

$( document ).ready(function() {
	setContainerDimensions(container);
	newSketchButton.addEventListener('click', onNewSketchButtonClick);
	fillTilesArray();
	generateGrid();
	
	// tile = new Tile(tileTypes.GRASS);
});

function generateGrid() {

    // set grid square's dimension based on MAIN_CONTAINER_DIMENSIONS
    const tileDimensions = MAIN_CONTAINER_DIMENSIONS / ROWS;

    for (let r = 0; r < ROWS; ++r) {
        for (let c = 0; c < COLS; ++c) {
    
            let tile = document.createElement("div");

            tile.style.width
                = tile.style.height
                = tileDimensions.toString() + "px";
    
            if (c === 0) {
                tile.classList.add('clear-left');
            }
    
            tile.classList.add('grid-square');
            tile.addEventListener('mouseover', changeColor);
    
			tile.setAttribute('row', r);
			tile.setAttribute('col', c);
	
            container.appendChild(tile);
			
			// then fill tiles with the tile
			
			tiles[r][c] = new Tile(tileTypes.EMPTY);
        }
    }
}


function changeColor(e) {
	
	// console.log("r:" + e.target.getAttribute("row") + " || c:" + e.target.getAttribute("col"));
	
	const row = e.target.getAttribute("row");
	const col = e.target.getAttribute("col");
	const tile = tiles[row][col];
	
    if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "grass") {
        e.target.style.backgroundColor = getGrassColor();
        e.target.style.opacity = "";
		
		tile.tileType = tileTypes.GRASS;
    }
    else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "water") {
        e.target.style.backgroundColor = getWaterColor();
        e.target.style.opacity = "";
		
		tile.tileType = tileTypes.WATER;
    }
    else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "marsh") {
        e.target.style.backgroundColor = getMarshColor();
		e.target.style.opacity = "";
		
		tile.tileType = tileTypes.MARSH;
    }
	else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "plasma") {
        e.target.style.backgroundColor = getPlasmaColor();
		e.target.style.opacity = "";
		
		tile.tileType = tileTypes.PLASMA;
    }
}

function getUserInputForDimensions() {
    while (true) {
        let userInput = +prompt("Enter dimensions of grid (1 - 100):");

        if (userInput !== NaN
            && userInput !== undefined
            && userInput >= 1
            && userInput <= 100
            && Math.floor(userInput) === userInput) {
                return userInput;
            }
        else {
            alert("Invalid input; enter an integer number in the range [1, 100].");
        }
    }
}

function deleteGrid() {
    const tiles = document.querySelectorAll('.grid-square');
    for (let i = 0; i < tiles.length; ++i) {
        tiles[i].parentNode.removeChild(tiles[i]);
    }
}

function onNewSketchButtonClick() {
    ROWS = COLS = getUserInputForDimensions();
    deleteGrid();
    generateGrid();
}

// Tiles is an array of Tile objects
function fillTilesArray() {
	tiles = new Array(ROWS);
	for (var r = 0; r < tiles.length; r++) {
	  tiles[r] = new Array(COLS);
	}
}

function setContainerDimensions(container) {
    container.style.width
		= container.style.height 
		= MAIN_CONTAINER_DIMENSIONS.toString() + "px";
}

function getNormalColor() {
    return 'rgb(73, 67, 183)';
}

function getGrassColor() {
	return 'rgb(41, 166, 60)';
}

function getWaterColor() {
	return 'rgb(22, 81, 219)';
}

function getMarshColor() {
	return 'rgb(63, 105, 12)';
}

function getPlasmaColor() {
	return 'rgb(197, 211, 212)';
}

function printTilesArray() {
	for (let r = 0; r < ROWS; ++r) {
        for (let c = 0; c < COLS; ++c) {
			const tile = tiles[r][c];
			console.log(`Tile at (${r}, ${c}) is of tileType: ${tile.tileType}`);
        }
    }
}
	
