
class InsertionSort implements Sort {
  private int i;
  
  public InsertionSort() {
    this.i = 1;
  }
  
  public void sortStep(int[] list) {
    if (this.i >= list.length) return;
    
    int curr = list[i];
    int j = i - 1;
    
    // if true, we will continuously place old ones up one.
    while (j >= 0 && curr < list[j]) {
      list[j+1] = list[j];
      --j;
    }
    
    highlight.clear();
    highlight.append(j+1);
    highlight.append(i);
    list[j+1] = curr;
    
    i++;
  }
  
}
