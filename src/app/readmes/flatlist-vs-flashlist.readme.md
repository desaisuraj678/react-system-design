https://whitespectre.medium.com/flashlist-vs-flatlist-understanding-the-key-differences-for-react-native-performance-15f59236a39c

FlatList ->  uses Virtualization (like web)
          - Mounting and unmounting of components takes more resources

Flashlist -> uses recycling
          - Does not mount unmount everytime instead it recycles the compoenent with new data.
          - It works by keeping a fixed pool of component instances in memory. When an item scrolls out of view, it reuses the same component with new data instead of destroying and re-creating it.


         