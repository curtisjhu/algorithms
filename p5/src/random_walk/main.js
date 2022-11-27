var walker;
var pwalker;

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(240)
    walker = new Walker;
    pwalker = new PWalker
}

function draw() {
    walker.step();
    pwalker.noise_step();
}