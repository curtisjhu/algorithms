package com.curtisjhu.Birds;

import processing.core.PVector;

import java.util.ArrayList;
import java.util.List;

public class Flock {
    List<Bird> flock;
    App window;

    Flock(App instance, final int size) {
        window = instance;
        flock = new ArrayList<>();

        PVector center = window.dimensions.copy().div(2);
        for (int i = 0; i < size; i++){
            flock.add(new Bird(center.copy()));
        }
    }

    public void render() {
        for (Bird b : flock) {
            b.render(window, flock);
        }
    }
}
