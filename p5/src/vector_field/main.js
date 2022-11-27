var win = {
    x: {
        start: -8, 
        end: 8,
    },
    y: {
        start: -8,
        end: 8
    }
}
var t = 0;
var xInterval, yInterval;

function toCoordinates(i, j) {
    var x = map(i, 0, width, win.x.start, win.x.end);
    var y = map(j, 0, height, win.y.start, win.y.end);
    return createVector(x, y);
}
function toLocation(x, y) {
    var i = map(x, win.x.start, win.x.end, 0, width);
    var j = map(y, win.y.start, win.y.end, 0, height);
    return createVector(i, j);
}

function setup() {
    createCanvas(400, 400)
    var axes = toLocation(0, 0);
    line(axes.x, 0, axes.x, height);
    line(0, axes.y, width, axes.y);


    for (var i = 0; i < width; i += 20) {
        for (var j = 0; j < height; j += 20){
            var location = toCoordinates(i, j);
            var delta = r(location);

            // draw vector
            var m = map(delta.mag(), 0, 10, 50, 240);
            delta.setMag(10);

            stroke(150, m, 180);
            line(i, j, i + delta.x, j + delta.y);
        }
    }

    noLoop()
}

function r(p) {
    var x = sin(p.y);
    var y = sin(p.x);
    return createVector(x, y);
}