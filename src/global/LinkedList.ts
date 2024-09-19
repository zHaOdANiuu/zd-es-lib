interface LinkedListNode
{
  value: unknown;
  next: LinkedListNode | null;
}
/** 循环列表,且推介值唯一,相关的查找和删除通过值来查找 */
class LinkedList
{
      private _head: LinkedListNode | null;
      private _tail: LinkedListNode | null;
      constructor()
      {
            this._head = null;
            this._tail = null;
      }
      append(value: unknown): void
      {
            const newNode = { value, next: null };
            if (this._head === null) this._head = newNode;
            if (this._tail === null) this._tail = newNode;
            this._tail.next = newNode;
      }
      prepend(value: unknown): void
      {
            const newNode = { value, next: this._head };
            this._head = newNode;
            if (this._tail === null) this._tail = newNode;
      }
      find(value: unknown): LinkedListNode | null
      {
            let curNode = this._head;
            while (curNode !== null)
            {
                  if (curNode.value === value) return curNode;
                  curNode = curNode.next;
            }
            return null;
      }
      insertAfter(value: unknown, afterValue: number): void
      {
            const curNode = this.find(afterValue);
            if (curNode === null) return;
            const newNode = { value, next: curNode.next };
            curNode.next = newNode;
      }
      delete(value: unknown): void
      {
            if (this._head === null) return;
            if (this._head.value === value)
            {
                  this._head = this._head.next;
                  return;
            }
            let curNode = this._head;
            while (curNode.next !== null)
            {
                  if (curNode.next.value === value)
                  {
                        curNode.next = curNode.next.next;
                        return;
                  }
                  curNode = curNode.next;
            }
      }
      slice(): unknown[]
      {
            const result: unknown[] = [];
            let curNode = this._head;
            while (curNode !== null)
            {
                  result.push(curNode.value);
                  curNode = curNode.next;
            }
            return result;
      }
}

export default LinkedList;
