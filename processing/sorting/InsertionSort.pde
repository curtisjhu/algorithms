
class InsertionSort {
  private int i;
  public InsertionSort() {
    this.i = 1;
  }
  
  public void sortStep(int[] list) {
    int curr = list[i];
    int j = i - 1;
    
    // if true, we will continuously place old ones up one.
    while (curr < list[j] && j >= 0) {
      list[j+1] = list[j];
      --j;
    }
    list[j + 1] = curr; // put curr in a spot where there are no more smaller values.
    i++;
  }
  
}
