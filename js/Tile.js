const tileTypes = {
	EMPTY: 'empty',
    GRASS: 'grass',
    WATER: 'water',
    MARSH: 'marsh',
    PLASMA: 'plasma'
}

class Tile {
	constructor(tileType) {
		this.tileType = tileType;
	}
}