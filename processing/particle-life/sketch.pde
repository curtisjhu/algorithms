Population particles;

void setup() {
	pixelDensity(2);
	size(1280, 720);
	
	particles = new Population(1000, width, height);
}


void draw() {
  background(0);
  particles.updateVectors();
	particles.show();
}
