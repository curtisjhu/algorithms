Bars b;
SelectionSort s;
import processing.sound.*;

int prev;

void setup() {
  size(400, 400);
  pixelDensity(2);
  b = new Bars(60);
  
  s = new SelectionSort();
  
  prev = 2000;
  b.show();
}

void draw() {
  if (millis() - prev > 100) {
    prev = millis();
    s.sortStep(b.list);
    b.show(s.highlight);
    s.swap(b.list);
  }
}
