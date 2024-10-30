import { undef } from '../base/const';

interface Node
{
      value: any;
      next: undefined | Node;
}

/** 队列 */
class Queue<T>
{
      private head: undefined | Node;
      private tail: undefined | Node;
      private size!: number;
      constructor()
      {
            this.clear();
      }
      enqueue(value: T): void
      {
            const node: Node = { value, next: undef };
            if (this.head)
            {
                  (this.tail as Node).next = node;
                  this.tail = node;
            }
            else
            {
                  this.head = node;
                  this.tail = node;
            }
            ++this.size;
      }
      dequeue(): T | undefined
      {
            const current = this.head;
            if (!current) return;
            this.head = (this.head as Node).next;
            --this.size;
            return current.value;
      }
      length()
      {
            return this.size;
      }
      clear(): void
      {
            this.head = undef;
            this.tail = undef;
            this.size = 0;
      }
      each(f: (value: T) => void): void
      {
            let current = this.head;
            while (current)
            {
                  f(current.value);
                  current = current.next;
            }
      }
}

export default Queue;
