export class Queue<T>
{
      private _items: T[] = [];
      enqueue(item: T): void
      {
            this._items.push(item);
      }
      dequeue(): T | void
      {
            return this._items.shift();
      }
      peek(): T
      {
            return this._items[0];
      }
      clear(): void
      {
            this._items = [];
      }
      length(): number
      {
            return this._items.length;
      }
}
