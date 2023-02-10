Population particles;

void setup() {
	pixelDensity(2);
	size(640, 320);
	
	particles = new Population(500, width, height);
}


void draw() {
  background(0);
  particles.updateVectors();
	particles.show();
}
