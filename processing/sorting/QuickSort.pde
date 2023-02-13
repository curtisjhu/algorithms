//class QuickSort implements Sort {
//  private int i;
  
//  public QuickSort() {
//    this.i = 1;
//  }
  
//  public void sortStep(int[] list) {
//    if (low < high) {
//      int pivot = partition(list, low, high);
//      sortStep(list, low, pivot -1);
//      sortStep(list, pivot +1, high);
//    }
//  }
  
//  public int partition(int[] arr, int low, int high) {
//    int pivot = arr[high];
//    int i = low - 1;
    
//    for (int j = low; j <= high - 1; j++) {
//      if (arr[j] < pivot) {
//        i++;
        
//        int temp = arr[i];
//        arr[i] = arr[j];
//        arr[j] = temp;
//      }
//    }
    
//    int temp = arr[i+1];
//    arr[i+1] = arr[high];
//    arr[high] = temp;
    
//    return i + 1;
//  }
//}
