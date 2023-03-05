

class Population {
	private ArrayList<Particle> particles;
	float[][] attractionMatrix;
  float speedLimit = 0.08f;
  float visionField = 70;

	public Population(int size, int width, int height) {
		this.particles = new ArrayList<Particle>();
    randomSeed(size);

		// roughly a population of 'size' but not exactly
    int radius = width/2;
    int numberOfGroups = 4;    
    
    // Clustering pattern
		for (int c = 0; c < numberOfGroups; c++) {       
			int groupNumber = c;
			PVector clusterPostion = new PVector(random(width), random(height));

			int groupSize = size / numberOfGroups;
			for (int i = 0; i < groupSize; i++) {
				float m = radius * sin(10000*i); // random function
				PVector pos = PVector.add(clusterPostion, PVector.random2D().setMag(m));
				this.particles.add(new Particle(pos, groupNumber));
			}
		}

    // create attraction matrix
    // assuming number of groups is 4
    float[][] matrix = {
      {0.7, 0.3, 0, 0},
      {0, 0.7, 0.3, 0},
      {0, 0, 0.7, 0.3},
      {0.3, 0, 0, 0.7}
    };
    this.attractionMatrix = matrix;
	}

  public void updateVectors() {
    for (Particle a : particles) {
      for (Particle b : particles) {
        if (a != b && a.position.dist(b.position) < visionField) {
          float gravitationalConstant = attractionMatrix[a.species][b.species];
          PVector desired = PVector.sub(b.position, a.position);
          float r = desired.mag();
          
          float padding = a.size*2;
          float middle = (visionField - (a.size + 20)) / 2;
          if (r < padding) gravitationalConstant = -4 * ((padding - r) / padding);
          else if (r < padding + middle) gravitationalConstant *= (r-padding)/middle;
          else gravitationalConstant *= (visionField - r) / middle;
          
          float force = gravitationalConstant * 1/r;

          desired.normalize().setMag(force).limit(speedLimit);
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
