export class LRUCache<T> {
    private capacity: number;
    private cache: Map<string, { key: string; value: T; prev: string | null; next: string | null }>;
    private head: string | null;
    protected tail: string | null;
  
    constructor(capacity: number) {
      this.capacity = capacity;
      this.cache = new Map<string, { key: string; value: T; prev: string | null; next: string | null }>();
      this.head = null;
      this.tail = null;
    }
}