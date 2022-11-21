package com.curtisjhu.Boid;

import processing.core.PVector;

import java.util.ArrayList;
import java.util.List;

public class Flock {

    List<Boid> flock;
    App window;

    Flock(App instance, final int size) {
        window = instance;
        flock = new ArrayList<>();

//        float maxLength = Math.min(window.dimensions.x, window.dimensions.y);
        PVector center = window.dimensions.copy().div(2);
        for (int i = 0; i < size; i++){
//            float randScalar = (float) Math.random() * maxLength;
//            PVector initPosition = PVector.random3D().mult(randScalar);
//            initPosition.add(center);
            flock.add(new Boid(center));
        }
    }

    public void render() {
        for (Boid b : flock) {
            b.render(window, flock);
        }
    }
}
