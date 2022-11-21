package com.curtisjhu.MandelBrotSet;

import processing.core.PVector;

import static java.lang.Math.round;

public class MandelBrotSet {
    /**
     * z_0 = 0
     * z_{n+1} = z_n + c
     *
     * If it diverges so that the magnitude is beyond 2, it is not part of the set.
     * If it converges or oscillates, it is part of the set.
     */

    Complex z;
    int max = 80;
    Window window;


    MandelBrotSet(Window win) {
        this.window = win;
    }


    public int insideMandelBrotSet(Complex test){
        int i = 0;
        z = new Complex(0, 0);
        while (z.magnitude() < 2 && i < max) {
            z.square();
            z.add(test);
            i++;
        }
        return 255 - round(255 * i / max);
    }

    private Complex mapToComplexPlane(float x, float y, Window dimensions) {
        float real = window.rstart + window.getWidth() * x / dimensions.getWidth();
        float imaginary = window.iend - window.getHeight() * y / dimensions.getHeight();
        return new Complex(real, imaginary);
    }

    public void render(App plot) {
        Window dimensions = new Window(0, plot.pixelWidth, 0, plot.pixelHeight);

        for (int x = 0; x < plot.pixelWidth; x++){
            for (int y = 0; y < plot.pixelHeight; y++){
                Complex current = mapToComplexPlane(x, y, dimensions);
                int grayscale = insideMandelBrotSet(current);
                plot.set(x, y, plot.color(grayscale));
            }
        }
    }
}
