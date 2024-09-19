import { undef } from './const';

interface Node
{
      value: any;
      next: undefined | Node;
}

class Queue<T>
{
      private _head: undefined | Node;
      private _tail: undefined | Node;
      private _size = 0;
      constructor()
      {
            this.clear();
      }
      enqueue(value: T): void
      {
            const node: Node = { value, next: undef };

            if (this._head)
            {
                  (this._tail as Node).next = node;
                  this._tail = node;
            }
            else
            {
                  this._head = node;
                  this._tail = node;
            }
            ++this._size;
      }
      dequeue(): T | undefined
      {
            const current = this._head;
            if (!current) return;
            this._head = (this._head as Node).next;
            --this._size;
            return current.value;
      }
      size()
      {
            return this._size;
      }
      clear(): void
      {
            this._head = undef;
            this._tail = undef;
            this._size = 0;
      }
}

export default Queue;
