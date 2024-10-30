import { indexOf } from '../lib/es5';

/** 栈 */
class Stack<T>
{
      private items: T[];
      constructor()
      {
            this.items = [];
      }
      push(value: T): void
      {
            this.items.push(value);
      }
      pop(): T | undefined
      {
            return this.items.pop();
      }
      peek(): T
      {
            return this.items[this.items.length - 1];
      }
      isEmpty(): boolean
      {
            return this.items.length === 0;
      }
      clear(): void
      {
            this.items = [];
      }
      remove(value: T): void
      {
            const index = indexOf(this.items, value);
            if (index > -1) this.items.splice(index, 1);
      }
      each(f: (value: T) => void)
      {
            let i = this.items.length;
            while (i) f(this.items[--i]);
      }
}

export default Stack;
