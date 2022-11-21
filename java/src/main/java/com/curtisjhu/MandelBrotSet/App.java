package com.curtisjhu.MandelBrotSet;

import processing.core.*;

public class App extends PApplet {

    @Override
    public void settings() {
        size(600, 400);
        pixelDensity(2); // For mac retina display
    }

    @Override
    public void setup() {
        Window plotWindow = new Window(-2, 1, -1, 1);
        MandelBrotSet beauty = new MandelBrotSet(plotWindow);
        beauty.render(this);
    }

    public static void main(String[] args) {
        String[] appArgs = new String[] {"MandelBrot Set"};
        App sketch = new App();
        PApplet.runSketch(appArgs, sketch);
    }
}
