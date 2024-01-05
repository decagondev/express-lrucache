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

    private removeNode(key: string): void {
        const node = this.cache.get(key);
        if (node) {
          if (node.prev !== null) {
            const prevNode = this.cache.get(node.prev);
            if (prevNode) {
              prevNode.next = node.next;
            }
          } else {
            this.head = node.next;
          }
    
          if (node.next !== null) {
            const nextNode = this.cache.get(node.next);
            if (nextNode) {
              nextNode.prev = node.prev;
            }
          } else {
            this.tail = node.prev;
          }
        }
        this.cache.delete(key);
    }
}