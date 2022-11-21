package com.curtisjhu.MandelBrotSet;

class Complex {
    public float real, imaginary;
    Complex(float r, float i) {
        real = r;
        imaginary = i;
    }
    public double magnitude() {
        return Math.sqrt(real*real + imaginary*imaginary);
    }
    public void square() {
        float tmp = 2*real*imaginary;
        real = real*real - imaginary*imaginary;
        imaginary = tmp;
    }
    public void add(Complex other) {
        real += other.real;
        imaginary += other.imaginary;
    }
}