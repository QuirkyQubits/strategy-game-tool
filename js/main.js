let ROWS = COLS = 7;
const MAIN_CONTAINER_DIMENSIONS = 600; // width and height of main container box, in px

let tiles = null; // array of Tile objects
const container = document.querySelector("#main-container");
const newLevelButton = document.querySelector('#new-level-button');
const sketchModeCheckbox = document.getElementById('sketch-mode-checkbox');
const coloringStyleSelection = document.getElementById('coloring-style-selection');
const downloadJsonButton = document.getElementById('download-json-button');
const importJsonButton = document.getElementById('import-json-button');
let toggle = false;
let currentTileDiv = null;

$( document ).ready(function() {
	setContainerDimensions(container);
	newLevelButton.addEventListener('click', onNewLevelButtonClick);
	downloadJsonButton.addEventListener('click', downloadJson);
	importJsonButton.addEventListener('click', importJson);
	
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
	
	initializeTilesArray();
	generateGrid();
	
	
});

// imports the Json file the user uploaded to the file input area
function importJson() {
	let files = document.getElementById('json-file-select-input').files;
	// console.log(files);
	if (files.length <= 0) {
		return false;
	}

	let fr = new FileReader();

	fr.onload = function(e) { 
		// console.log(e);
		let json = JSON.parse(e.target.result);
		loadFromJson(json);
		let formatted = JSON.stringify(json, null, 2);
		document.getElementById('json-import-result-text').value = formatted;
	}

	fr.readAsText(files.item(0));
};

function loadFromJson(json) {
	// set the dimensions correctly, populate the divs/array correctly
	
	ROWS = json["ROWS"];
	COLS = json["COLS"];
	const tilesArray = json["tilesArray"];
	initializeTilesArray();
	
	//console.log(ROWS);
	//console.log(COLS);
	console.log("Tiles var after loading:");
	console.log(tiles);
	
    deleteGrid();
	
	// set grid square's dimension based on MAIN_CONTAINER_DIMENSIONS
    const tileDimensions = Math.floor(MAIN_CONTAINER_DIMENSIONS / ROWS);
	
	console.log(`Tile dimensions (px): ${tileDimensions}`);
	
	for (let r = 0; r < ROWS; ++r) {
		for (let c = 0; c < COLS; ++c) {
			let tileDiv = document.createElement("div");

            tileDiv.style.width
                = tileDiv.style.height
                = `${tileDimensions}px`;
    
            if (c === 0) {
                tileDiv.classList.add('clear-left');
            }
    
            tileDiv.classList.add('grid-square');
			
            tileDiv.addEventListener('mouseover', onTileMouseOver);
			
			tileDiv.addEventListener('mouseleave', function(e){
				currentTileDiv = null;
			});
    
			tileDiv.setAttribute('row', r);
			tileDiv.setAttribute('col', c);
	
            container.appendChild(tileDiv);
			
			// then fill tiles with the tile
			
			let tileObj = tilesArray[r][c];
			
			//console.log(tileObj);
			//console.log(tileObj["tileType"]);
			
			if (tileObj["tileType"] === tileTypes.GRASS) {
				tiles[r][c] = new Tile(tileTypes.GRASS);
				changeColor(tileDiv, tileTypes.GRASS);
			}
			else if (tileObj["tileType"] === tileTypes.WATER) {
				tiles[r][c] = new Tile(tileTypes.WATER);
				changeColor(tileDiv, tileTypes.WATER);
			}
			else if (tileObj["tileType"] === tileTypes.MARSH) {
				tiles[r][c] = new Tile(tileTypes.MARSH);
				changeColor(tileDiv, tileTypes.MARSH);
			}
			else if (tileObj["tileType"] === tileTypes.PLASMA) {
				tiles[r][c] = new Tile(tileTypes.PLASMA);
				changeColor(tileDiv, tileTypes.PLASMA);
			}
			else if (tileObj["tileType"] === tileTypes.EMPTY) {
				// do nothing
				tiles[r][c] = new Tile(tileTypes.EMPTY);
				changeColor(tileDiv, tileTypes.EMPTY);
			}
			else {
				console.log("loadFromJson():: unknown tileType");
			}
		}
	}
}

// call this once, when the page first loads
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

function changeColor(tileDiv, tileType) {
	if (arguments.length === 1) {
		
		//console.log("changeColor 1 param called");
	
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
	else if (arguments.length === 2) {
		
		//console.log("changeColor 2 param called");
		
		if (tileType === tileTypes.GRASS) {
			tileDiv.style.backgroundColor = getGrassColor();
			tileDiv.style.opacity = "";
		}
		else if (tileType === tileTypes.WATER) {
			tileDiv.style.backgroundColor = getWaterColor();
			tileDiv.style.opacity = "";
		}
		else if (tileType === tileTypes.MARSH) {
			tileDiv.style.backgroundColor = getMarshColor();
			tileDiv.style.opacity = "";
		}
		else if (tileType === tileTypes.PLASMA) {
			tileDiv.style.backgroundColor = getPlasmaColor();
			tileDiv.style.opacity = "";
		}
		else if (tileType === tileTypes.EMPTY) {
			tileDiv.style.backgroundColor = getEmptyColor();
			tileDiv.style.opacity = "";
		}
		else {
			console.log("loadFromJson():: unknown tileType");
		}
	}
	else {
		console.log("changeColor():: unsupported arguments passed");
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

function onNewLevelButtonClick() {
    ROWS = COLS = getUserInputForDimensions();
    deleteGrid();
	initializeTilesArray();
    generateGrid();
}

function downloadJson() {
	downloadString(getOutputJsonString(),
		'text/json',
		'strategy-game-export.json');
}

// Tiles is an array of Tile objects
function initializeTilesArray() {
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

function getEmptyColor() {
	return 'rgb(255, 255, 255)';
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
	
