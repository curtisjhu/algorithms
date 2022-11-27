package com.curtisjhu.LogisticMap;

import processing.core.*;

public class App extends PApplet {
    /**
     *
     */

    @Override
    public void settings() {
        size(960, 480);
        pixelDensity(2);
    }

    @Override
    public void setup() {
        background(0);
        stroke(255);

        NumberSet domain = new NumberSet(1, 4);
        NumberSet range = new NumberSet(0, 1);
        LogisticMap map = new LogisticMap(domain, range);
        map.render(this);
    }

    public static void main(String[] args) {
        String[] appArgs = new String[] {"LogisticMap Sketch"};
        App sketch = new App();
        PApplet.runSketch(appArgs, sketch);
    }
}
