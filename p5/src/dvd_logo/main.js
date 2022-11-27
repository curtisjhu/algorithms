var v;
var c;
var speed = 2;
let logo;
const colors = [[255, 0, 0], [255, 128, 0], [255, 255, 0], [128, 255, 0], [0, 255, 0], [0, 255, 128],
[0, 255, 255], [0, 128, 255], [0, 0, 255], [128, 0, 255], [255, 0, 255], [255, 0, 128]];

function preload() {
    let prelogo = loadImage("dvd.png");
    logo = new LogoImage(prelogo, 110);
}

function setup() {
    createCanvas(600, 400)
    var ang = random(TWO_PI);
    v = new Vector(cos(ang) * speed, sin(ang) * speed);
    c = new ColorVector(255, 0, 0);
}

function draw() {
    background(15);
    c.shift();
    tint(c.color());

    logo.show();
    v = logo.checkBoundaries(v);
    logo.move(v);
}


class LogoImage {
    constructor(img, s) {
        this.img = img;
        this.r = new Vector(0, 0)
        this.s = s;
    }

    show() {
        image(this.img, this.r.x, this.r.y, this.s, this.s);
    }
    move(u) {
        this.r.add(u);
    }

    checkBoundaries(movementVector) {
        if (this.r.x < 0 || this.r.x + this.s > width) {
            movementVector.flipx();
        }
        if (this.r.y < 0 || this.r.y + this.s > height) {
            movementVector.flipy();
        }
        return movementVector;
    }

}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(w) {
        this.x += w.x;
        this.y += w.y;
    }
    flipx() {
        this.x *= -1;
    }
    flipy() {
        this.y *= -1;
    }
}

class ColorVector {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.i = 0;
        this.rate = 3;
    }
    equals(i) {
        var epsilon = 10;
        if (Math.abs(this.r - colors[i][0]) < epsilon &&
            Math.abs(this.g - colors[i][1]) < epsilon &&
            Math.abs(this.b == colors[i][2]) < epsilon) {
            return true;
        }
        return false;
    }
    shift() {
        if (this.equals(this.i)) {
            this.i = (this.i + 1) % colors.length;
        }
        this.r += (colors[this.i][0] - this.r) > 0 ? this.rate : -this.rate;
        this.g += (colors[this.i][1] - this.g) > 0 ? this.rate : -this.rate;
        this.b += (colors[this.i][2] - this.b) > 0 ? this.rate : -this.rate;
    }
    color() {
        return color(this.r, this.g, this.b)
    }
}