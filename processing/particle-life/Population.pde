

class Population {
	private ArrayList<Particle> particles;
	float[][] attractionMatrix;
  float speedLimit = 0.001f;
  float visionField = 70;

	public Population(int size, int width, int height) {
		this.particles = new ArrayList<Particle>();

		// roughly a population of 'size' but not exactly
    int radius = 50;
    int numberOfGroups = 4;    
    
    // Clustering pattern
		for (int c = 0; c < numberOfGroups; c++) {
			int groupNumber = c;
			PVector clusterPostion = new PVector(random(width), random(height));

			int groupSize = size / numberOfGroups;
			for (int i = 0; i < groupSize; i++) {
				float mag = randomGaussian()*2*radius  - radius;
				PVector pos = PVector.add(clusterPostion, PVector.random2D().setMag(mag));
				this.particles.add(new Particle(pos, groupNumber));
			}
		}

    // create attraction matrix
    // assuming number of groups is 4
    float[][] matrix = {
      {1, 0, 0, 0},
      {0, 1, 0, 0},
      {0, 0, 1, 0},
      {0, 0, 0, 1}
    };
    this.attractionMatrix = matrix;
	}

  public void updateVectors() {
    for (Particle a : particles) {
      for (Particle b : particles) {
        if (a != b && a.position.dist(b.position) < visionField) {
          float attraction = attractionMatrix[a.species][b.species];
          PVector desired = PVector.sub(b.position, a.position);
          float r = desired.mag();
          

          float start = a.size + 40;
          float mag = -4 * (start - r)/start;
          float optimal = (visionField - start) /2;
          if (r > start && r < optimal + start) {
            mag = attraction * (r - start) / optimal;
          } else if (r > optimal + start) {
            mag = attraction * (visionField - r)/optimal;
          }
          
          desired.normalize().setMag(mag).limit(speedLimit);
          a.velocity.add(desired);
        }
      }
    }
  }

	public void show() {
		for (Particle p : particles) {
      p.update();
			p.show();
		}
	}
}
