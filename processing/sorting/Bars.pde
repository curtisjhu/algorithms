

class Bars {
  public int[] list;
  private int size;
  private int padding;
  private float maxValue = 100f;
  private float bwidth;
  private float totalHeight;
  
  public Bars(int size) {
    this.size = size;
    this.list = new int[size];
    randomSeed(size);
    
    for(int i = 0; i < size; i++) {
      list[i] = int(random(maxValue));
    }
    
    padding = 10;
    bwidth = float(width - 2*padding)/size;
    totalHeight = height - 2*padding;

  }
  
  public void show(IntList highlights) {
    background(0);
    noStroke();
    
    for(int i = 0; i < size; i++) {
      fill(255);
      if (highlights.hasValue(i))
        fill(255, 0, 0);
      
      float bheight = totalHeight * list[i]/maxValue;
      float x = i * bwidth + padding;
      float y = height - padding - bheight;
      rect(x, y, bwidth, bheight);
    }
  }
  
  public void show() {
    show(new IntList());
  }
}
