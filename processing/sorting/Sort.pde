interface Sort {
    public IntList highlight = new IntList();
    public void sortStep(int[] list);
    default public void swap(int[] list) {
      int i = highlight.max();
      int j = highlight.min();
      int temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
}
