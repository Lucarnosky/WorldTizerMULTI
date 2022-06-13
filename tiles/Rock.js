const Tile = require('../tiles/Tile.js');
const axios = require('axios').default;

class Rock extends Tile {

    genWithWater = 0;
    constructor() {
        super("Rock");
        //Hex dark gray
        this.color = "#808080";
    }

    update(map) {
        super.update(map);
        if (this.countSurrounding(map, "Water") > 0) {
            this.genWithWater++;
        }
        if (this.genWithWater > 5) {
            const body = { x: this.x,y : this.y, tile: "Sand" };

            axios.post('http://172.17.21.111:3000/map', {
                x: this.x,
                y: this.y,
                tile:"Sand"
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
}

module.exports = Rock;