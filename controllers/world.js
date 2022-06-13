const TileMap = require('../tiles/TileMap.js');

var map = new Array(100).fill(0).map(() => new Array(100).fill(0));
var gen = 0;
var nextTile = '';

getMap = (req, res, next) => {
    res.json({ status: "true", gen:gen,map:map });
};

sampleMap = (req, res, next) => {
    x = 10;
    y = 10;
    for( var i = -1; i < 2; i++ ){
        for( var j = -1; j < 2; j++ ){
            map[x+i][y+j] = new TileMap.Rock();
            map[x+i][y+j].setCoords(x, y);
        }
    }
    map[x][y] = new TileMap.Water();
    res.redirect('http://localhost:3000/next');
}

addToMap = (req, res, next) => {
    const { x, y, tile } = req.body;
    map[x][y] = eval(`new TileMap.${tile}()`);
    map[x][y].setCoords(x, y);
    increaseGen ()
    res.json({ status: "true", results:map });
}

nextTurn = (req, res, next) => {
    increaseGen ()
    //draw map in html table
    html = "<table>";
    for (var i = 0; i < map.length; i++) {
        html += "<tr>";
        for (var j = 0; j < map[i].length; j++) {
            //check if type is not undefined
            if (map[i][j] != 0) 
                html += "<td style='background-color:"+map[i][j].color+";height:10px;width:10px'></td>";
            else
                html += "<td style='background-color:#f0f0f0;height:10px;width:10px'> </td>";
        }
        html += "</tr>";
    }
    html += "</table><script>setTimeout(function(){window.location.reload();},1000);</script>";
    res.end(html);
}

resetMap = (req, res, next) => {
    map = new Array(100).fill(0).map(() => new Array(100).fill(0));
    res.json({ status: "true", results:map });
    gen = 0;
}

function increaseGen (){
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            //check if tile is alive
            if (map[i][j] != 0) {
                map[i][j].update(map);
            }
        }
    } 
    gen ++;
}

module.exports = { getMap,addToMap,resetMap,nextTurn,sampleMap };