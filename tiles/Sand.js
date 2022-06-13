const Tile = require('../tiles/Tile.js');
const axios = require('axios').default;

class Sand extends Tile {

    constructor() {
        super("Sand");
        this.color = "#ff0";
    }

    update(map) {
        super.update(map);
        if (this.countSurrounding(map, "Sand") > 3 && this.genAlive > 5) {
            //expand to adjacent tiles
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    if (map[this.x + i][this.y + j].type != "Water" && map[this.x + i][this.y + j].type != "Sand" ) {
                        axios.post('http://172.17.21.111:3000/map', {
                            x: this.x + i,
                            y: this.y + j,
                            tile: "Sand"
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
        }
    }
}

module.exports = Sand;