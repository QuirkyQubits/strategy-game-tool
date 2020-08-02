let ROWS = COLS = 7;
let MAIN_CONTAINER_DIMENSIONS = 600; // width and height of main container box, in px

let tiles = null; // array of Tile objects
const container = document.querySelector("#main-container");
const newSketchButton = document.querySelector('#new-sketch-button');
const sketchModeCheckbox = document.getElementById('sketch-mode-checkbox');
const coloringStyleSelection = document.getElementById('coloring-style-selection');
const downloadJSONButton = document.getElementById('download-json-button');
let toggle = false;
let currentTileDiv = null;

$( document ).ready(function() {
	setContainerDimensions(container);
	newSketchButton.addEventListener('click', onNewSketchButtonClick);
	downloadJSONButton.addEventListener('click', downloadJSON);
	
	// for toggle
	document.addEventListener('mousedown', function(event) {
		setToggleTrue();
		
		if (currentTileDiv !== null) {
			changeColor(currentTileDiv);
		}
	});
	document.addEventListener('mouseup', setToggleFalse);
	
	// for shortcut toggling 
	document.addEventListener('keydown', function(e) {
		const key = e.key; // "a", "1", "Shift", etc.
		if (key === "1"){
			setToggle(!toggle);
			
			if (currentTileDiv !== null) {
				changeColor(currentTileDiv);
			}
		}
	});
	
	fillTilesArray();
	generateGrid();
});

function generateGrid() {

    // set grid square's dimension based on MAIN_CONTAINER_DIMENSIONS
    const tileDimensions = Math.floor(MAIN_CONTAINER_DIMENSIONS / ROWS);

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
			
            tile.addEventListener('mouseover', onTileMouseOver);
			
			tile.addEventListener('mouseleave', function(e){
				currentTileDiv = null;
			});
    
			tile.setAttribute('row', r);
			tile.setAttribute('col', c);
	
            container.appendChild(tile);
			
			// then fill tiles with the tile
			
			tiles[r][c] = new Tile(tileTypes.EMPTY);
        }
    }
}

function changeColor(tileDiv) {
	const row = tileDiv.getAttribute("row");
	const col = tileDiv.getAttribute("col");
	const tile = tiles[row][col];
	
    if (coloringStyleSelection.value === "grass") {
        tileDiv.style.backgroundColor = getGrassColor();
        tileDiv.style.opacity = "";
		
		tile.tileType = tileTypes.GRASS;
    }
    else if (coloringStyleSelection.value === "water") {
        tileDiv.style.backgroundColor = getWaterColor();
        tileDiv.style.opacity = "";
		
		tile.tileType = tileTypes.WATER;
    }
    else if (coloringStyleSelection.value === "marsh") {
        tileDiv.style.backgroundColor = getMarshColor();
		tileDiv.style.opacity = "";
		
		tile.tileType = tileTypes.MARSH;
    }
	else if (coloringStyleSelection.value === "plasma") {
        tileDiv.style.backgroundColor = getPlasmaColor();
		tileDiv.style.opacity = "";
		
		tile.tileType = tileTypes.PLASMA;
    }
}


function onTileMouseOver(e) {
	// console.log("r:" + e.target.getAttribute("row") + " || c:" + e.target.getAttribute("col"));
	
	currentTileDiv = e.target;
	
	if (!toggle)
		return;
	
	changeColor(e.target);
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

function setToggleTrue() { setToggle(true); }
function setToggleFalse() { setToggle(false); }

function setToggle(value) {
  // console.log(`setToggle(${value})`);
  
  // perhaps also set a UI element that displays the toggle status here
  // <code>
  
  toggle = value;
}

function deleteGrid() {
    const htmlTiles = document.querySelectorAll('.grid-square');
    for (let i = 0; i < htmlTiles.length; ++i) {
        htmlTiles[i].parentNode.removeChild(htmlTiles[i]);
    }
}

function onNewSketchButtonClick() {
    ROWS = COLS = getUserInputForDimensions();
    deleteGrid();
	fillTilesArray();
    generateGrid();
}

function downloadJSON() {
	downloadString(getOutputJsonString(),
		'text/json',
		'strategy-game-export.json');
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

// taken from https://gist.github.com/danallison/3ec9d5314788b337b682
// usage: // downloadString(JSON.stringify(tiles), 'text/json', 'strategy-game-export.json');
function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

function getOutputJsonString() {
	// JSON.stringify(tiles);
	
	let outerJson = new Object();
	
	outerJson['tilesArray'] = tiles;
	
	outerJson['ROWS'] = ROWS;
	outerJson['COLS'] = COLS;
	
	// outerJson['startingCoordinate'] = new Coordinate(2, 1);
	
	console.log(JSON.stringify(outerJson));
	
	return JSON.stringify(outerJson);
}
	
