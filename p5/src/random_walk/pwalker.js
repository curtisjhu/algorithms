class PWalker {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        noiseSeed(300)
        this.tx = 0;
        this.ty = 10000;
    }

    noise_step() {
        this.x = map(noise(this.tx), 0, 1, 0, width)
        this.y = map(noise(this.ty), 0, 1, 0, height)
        this.tx += 0.01;
        this.ty += 0.01;

        this.display();
    }

    display() {
        stroke(2);
        point(this.x,this.y);
    }
}