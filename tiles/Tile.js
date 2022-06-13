
class Tile{

    constructor(type = "Basic Tile"){
        this.type = type;
        this.genAlive = -1;
        //Hex light gray
        this.color = "#f0f0f0";
    }

    update(map){
        this.genAlive ++;
    }

    setCoords(x,y){
        this.x = x;
        this.y = y;
    }

    checkSurrounding(map,reserchType){
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (map[this.x + i] != undefined && map[this.x + i][this.y + j] != undefined) {
                    if (map[this.x + i][this.y + j].type == reserchType) {
                        return true;
                    }
                }
            }
        }
    }

    countSurrounding(map,reserchType){
        var count = 0;
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (map[this.x + i] != undefined && map[this.x + i][this.y + j] != undefined) {
                    if (map[this.x + i][this.y + j].type == reserchType) {
                        count ++;
                    }
                }
            }
        }
        return count;
    }
}

module.exports = Tile;