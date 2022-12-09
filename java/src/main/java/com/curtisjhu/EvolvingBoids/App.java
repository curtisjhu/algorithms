package com.curtisjhu.EvolvingBoids;

import processing.core.PApplet;

public class App extends PApplet {
    @Override
    public void settings(){
        size(600, 400);
    }

    @Override
    public void draw() {

    }

    public static void main(String[] args) {
        String[] appArgs = new String[]{"Boid Sketch"};
        App app = new App();
        PApplet.runSketch(appArgs, app);
    }
}
