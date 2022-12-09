package com.curtisjhu.Boid;

import processing.core.*;

/**
 *  3D Boids
 *  @author curtisjhu
 *  Inspired by Ben Eater, Daniel Shiffman.
 *  Check out Ben Eater's implementation at <link>https://eater.net/boids</link>
 *  Check out the pseudocode implementation at <link>http://www.kfish.org/boids/pseudocode.html</link>
 */

public class App extends PApplet {

    Flock flock;
    public PVector dimensions;

    @Override
    public void settings() {
        dimensions = new PVector(600, 500, 400);
        size((int) dimensions.x, (int) dimensions.y);
        pixelDensity(2);

        flock = new Flock(this, 1000);
    }

    @Override
    public void draw() {
        background(255);
        noStroke();
        fill(0);
        flock.render();
    }

    public static void main( String[] args ) {
        String[] appArgs = new String[]{"Boid Sketch"};
        App app = new App();
        PApplet.runSketch(appArgs, app);
    }
}
