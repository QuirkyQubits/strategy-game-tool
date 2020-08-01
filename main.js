let ROWS = COLUMNS = 7;
let MAIN_CONTAINER_DIMENSIONS = 500; // width and height of main container box, in px

const container = document.querySelector("#main-container");
setContainerDimensions(container);

newSketchButton = document.querySelector('#new-sketch-button');
newSketchButton.addEventListener('click', onNewSketchButtonClick);

sketchModeCheckbox = document.getElementById('sketch-mode-checkbox');

coloringStyleSelection = document.getElementById('coloring-style-selection');

generateGrid();

function setContainerDimensions(container) {
    container.style.width = container.style.height = MAIN_CONTAINER_DIMENSIONS.toString() + "px";
}

function generateGrid() {

    // set grid square's dimension based on MAIN_CONTAINER_DIMENSIONS
    const tileDimensions = MAIN_CONTAINER_DIMENSIONS / ROWS;

    for (let r = 1; r <= ROWS; ++r) {
        for (let c = 1; c <= COLUMNS; ++c) {
    
            let tile = document.createElement("div");

            tile.style.width
                = tile.style.height
                = tileDimensions.toString() + "px";
    
            if (c === 1) {
                tile.classList.add('clear-left');
            }
    
            tile.classList.add('grid-square');
            tile.addEventListener('mouseover', changeColor);
    
            container.appendChild(tile);
        }
    }
}

/*
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}
*/

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

/*
function darkenSquare(target) {
    console.log(target.style.opacity);

    let opacity = +target.style.opacity;
    opacity += 0.1;
    if (opacity > 1) opacity = 1;
    target.style.opacity = opacity;
    
    console.log(target.style.opacity);
}
*/

function changeColor(e) {
    if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "grass") {
        e.target.style.backgroundColor = getGrassColor();
        e.target.style.opacity = "";
    }
    else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "water") {
        e.target.style.backgroundColor = getWaterColor();
        e.target.style.opacity = "";
    }
    else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "marsh") {
        e.target.style.backgroundColor = getMarshColor();
		e.target.style.opacity = "";
    }
	else if (!sketchModeCheckbox.checked && coloringStyleSelection.value === "plasma") {
        e.target.style.backgroundColor = getPlasmaColor();
		e.target.style.opacity = "";
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
    ROWS = COLUMNS = getUserInputForDimensions();
    deleteGrid();
    generateGrid();
}

function getTile(r, c) {
	
}
