var angle = 0;
var r = 70;
var cx, cy;
var points = [];
var t = 0;

function setup() {
    createCanvas(400, 400)
    stroke(2);
    cx = width / 2;
    cy = height / 2;
}

function draw() {
    background(255);
    stroke(0);
    circle(cx, cy, 2 * r, 2 * r);
    line(cx, cy, width, cy);

    var point = { x: cx + r * cos(angle), y: cy - r * sin(angle) }
    stroke(255, 240, 10);
    line(cx, cy, point.x, point.y);

    var lpoint = {x: cx+t, y: point.y};
    points.push(lpoint);

    stroke(10, 240, 240);
    line(point.x, point.y, lpoint.x, lpoint.y);

    noFill();
    stroke(10, 20, 240);
    beginShape();
    points.forEach((e) => {
        curveVertex(e.x, e.y);
    })
    endShape();

    angle += 0.01;
    t += 0.2;

    if (t>cx) {
        t = 0;
        angle = 0;
        points = [];
    }
}