class Stack<T>
{
      private _items: T[];
      constructor()
      {
            this._items = [];
      }
      push(value: T): void
      {
            this._items.push(value);
      }
      pop(): T | undefined
      {
            return this._items.pop();
      }
      peek(): T
      {
            return this._items[this._items.length - 1];
      }
      isEmpty(): boolean
      {
            return this._items.length === 0;
      }
      size(): number
      {
            return this._items.length;
      }
}

export default Stack;
