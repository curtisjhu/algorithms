package com.curtisjhu.MandelBrotSet;

public class Window {
    public float rstart, rend, istart, iend;

    Window(float rstart, float rend, float istart, float iend) {
        this.rstart = rstart;
        this.rend = rend;
        this.istart = istart;
        this.iend = iend;
    }
    public float getWidth() {
        return rend - rstart;
    }
    public float getHeight() {
        return iend - istart;
    }
}
