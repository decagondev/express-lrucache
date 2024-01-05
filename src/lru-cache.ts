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

    private addToFront(key: string, value: T): void {
        const newNode = {
          key,
          value,
          prev: null,
          next: this.head,
        };
    
        if (this.head !== null) {
          const headNode = this.cache.get(this.head);
          if (headNode) {
            headNode.prev = key;
          }
        } else {
          this.tail = key;
        }
    
        this.cache.set(key, newNode);
        this.head = key;
    }

    get(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (entry) {
          const value = entry.value;
            this.removeNode(key);
            this.addToFront(key, value);
            return value;
        }
        return undefined;
    }

    protected put(key: string, value: T): boolean {
        let retVal = false;
        if (this.cache.has(key)) {
          this.removeNode(key);
          retVal = true;
        } else if (this.cache.size >= this.capacity) {
          if (this.tail !== null) {
            this.removeNode(this.tail);
            retVal = true;
          }
        }
        this.addToFront(key, value);
        return retVal;
    }

    display(): void {
        let current = this.head;
        while (current !== null) {
          const node = this.cache.get(current);
          if (node) {
            console.log(`Key: ${node.key}, Value: ${node.value}`);
            current = node.next;
          } else {
            break;
          }
        }
    }
}

const remove = (key : string | null) : void  => console.log("Remove [", key, "]");
const add = <T>(key : string, value: T) : void  => console.log("Add [", key, "->", value, "]");

export class DLRUCache<T> extends LRUCache<T> {
    put(key: string, value: T): boolean {
      const curTail = {key: this.tail};
      const isPut = super.put(key, value);
      if(isPut) remove(curTail.key);
      add<T>(key, value);
      return true;
    }
}
