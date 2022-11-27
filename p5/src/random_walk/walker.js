class Walker {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        randomSeed(300)
    }

    step(){
        var choice = random(2*TWO_PI);
        this.y += sin(choice)
        this.x += cos(choice);
        this.display();
    }


    display() {
        stroke(0);
        point(this.x,this.y);
    }
}