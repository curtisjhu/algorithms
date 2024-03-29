class SelectionSort implements Sort {
  private int i;
  
  public SelectionSort() {
    this.i = 0;
  }
  
  public void sortStep(int[] list) {
      if (i >= list.length) return;
    
      int minIndex = i;
      for (int j = i+1; j < list.length; j++) {
        if (list[j] < list[minIndex]) {
          minIndex = j;
        }
      }
      
      highlight.clear();
      highlight.append(i);
      highlight.append(minIndex);
      i++;
  }
  
  public void swap(int[] list) {
    int i = highlight.max();
    int j = highlight.min();
    int temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
}
