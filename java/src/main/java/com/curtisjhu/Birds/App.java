package com.curtisjhu.Birds;

import processing.core.PApplet;
import processing.core.PVector;

public class App extends PApplet {
    public PVector dimensions;
    private Flock flock;

    @Override
    public void settings() {
        dimensions = new PVector(600, 400);
        size((int) dimensions.x, (int) dimensions.y);
        pixelDensity(2);
    }

    @Override
    public void setup() {
        flock = new Flock(this, 50);
    }

    @Override
    public void draw() {
        background(255);
        flock.render();
    }

    public static void main(String[] args) {
        String[] appArgs = new String[] {"Birds Sketch"};
        App sketch = new App();
        PApplet.runSketch(appArgs, sketch);
    }
}
