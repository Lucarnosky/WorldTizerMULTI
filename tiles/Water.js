const Tile = require('../tiles/Tile.js');

class Water extends Tile{

    constructor(){
        super("Water");
        //Hex light blue
        this.color = "#00f";
    }

    update(map){
        super.update(map);
    }
}

module.exports = Water;