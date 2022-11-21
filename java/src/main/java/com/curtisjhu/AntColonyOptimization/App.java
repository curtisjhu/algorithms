package com.curtisjhu.AntColonyOptimization;

import processing.core.*;

public class App extends PApplet {

    @Override
    public void settings() {
        size(640, 480);
    }

    @Override
    public void draw() {
        background(0);
        stroke(255);
        line(0, 0, 200, 200);
    }

    public static void main(String[] args) {
        String[] appArgs = new String[]{"Ant Colony Optimization Sketch"};
        App sketch = new App();
        PApplet.runSketch(appArgs, sketch);
    }
}
