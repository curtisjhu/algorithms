package com.curtisjhu.EvolvingBoids;

import processing.core.PApplet;
import io.jenetics.util.*;

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
        com.curtisjhu.Boid.App app = new com.curtisjhu.Boid.App();
        PApplet.runSketch(appArgs, app);
    }
}
