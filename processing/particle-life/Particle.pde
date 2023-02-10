class Particle {
  color c;
  PVector position;
  int size = 10;
  PVector velocity;
  int species;
  
  public Particle(PVector position, int species) {
    this.position = position;
    this.velocity = new PVector(0, 0);
    this.c = getRandomColor(species);
    this.species = species;
  }

  public void show() {
    noStroke();
    fill(this.c);
    circle(position.x, position.y, size);
  }
  
  public void update() {
    position.add(velocity);
    velocity.setMag(0.9 * velocity.mag());
    
    if (position.x > width + size)
      position.x -= width + 2*size;
    else if (position.x < -size)
      position.x += width + 2*size;
    if (position.y > height + size)
      position.y -= height + 2*size;
    else if (position.y < -size)
      position.y += height + 2*size;
  }
  
  private color getRandomColor(int seed) {
    randomSeed(seed);
    int r = int(random(256));
    int g = int(random(256));
    int b = int(random(256));
    return color(r, g, b);
  }
  
}
