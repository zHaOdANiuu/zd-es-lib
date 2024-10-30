import { isNull } from '../base/const';

interface LinkedListNode
{
      value: unknown;
      next: LinkedListNode | null;
}

/** 循环列表,建议值唯一,因为相关的查找和删除通过值来查找 */
class LinkedList
{
      private head: LinkedListNode | null;
      private tail: LinkedListNode | null;
      constructor()
      {
            this.head = null;
            this.tail = null;
      }
      append(value: unknown): void
      {
            const newNode = { value, next: null };
            if (isNull(this.head)) this.head = newNode;
            else (this.tail as LinkedListNode).next = newNode;
            this.tail = newNode;
      }
      prepend(value: unknown): void
      {
            const newNode = { value, next: this.head };
            this.head = newNode;
            if (isNull(this.tail)) this.tail = newNode;
      }
      find(value: unknown): LinkedListNode | null
      {
            if (isNull(this.head) || isNull(this.tail)) return null;
            let curNode: LinkedListNode | null = this.head;
            if (this.tail.value === value) return this.tail.next;
            while (!isNull(curNode))
            {
                  if (curNode.value === value) return curNode;
                  curNode = curNode.next;
            }
            return curNode;
      }
      insertAfter(value: unknown, afterValue: number): void
      {
            const curNode = this.find(afterValue);
            if (isNull(curNode)) return;
            const newNode = { value, next: curNode.next };
            curNode.next = newNode;
      }
      delete(value: unknown): void
      {
            if (isNull(this.head) || isNull(this.tail)) return;
            if (this.tail.value === value)
            {
                  this.tail = this.tail.next;
                  return;
            }
            let curNode = this.head;
            while (!isNull(curNode.next))
            {
                  if (curNode.next.value === value)
                  {
                        curNode.next = curNode.next.next;
                        return;
                  }
                  curNode = curNode.next;
            }
      }
      each(f: (value: unknown) => void)
      {
            let curNode = this.head;
            while (!isNull(curNode))
            {
                  f(curNode.value);
                  curNode = curNode.next;
            }
      }
}

export default LinkedList;
