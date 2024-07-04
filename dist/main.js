!function(globalThis) {
    "use strict";
    var Stack = function() {
        function Stack() {
            this._items = [];
        }
        Stack.prototype.push = function(value) {
            this._items.push(value);
        };
        Stack.prototype.pop = function() {
            return this._items.pop();
        };
        Stack.prototype.peek = function() {
            return this._items[this._items.length - 1];
        };
        Stack.prototype.isEmpty = function() {
            return 0 === this._items.length;
        };
        Stack.prototype.size = function() {
            return this._items.length;
        };
        return Stack;
    }();
    var global_Stack = Stack;
    function eachFolder(folder, suffix) {
        var result = [];
        var stack = new global_Stack;
        stack.push(folder.getFiles());
        for (;;) {
            var data = stack.pop();
            if (!data) {
                return result;
            }
            var len = data.length;
            for (var i = -1; ++i < len; ) {
                var item = data[i];
                item instanceof Folder ? stack.push(item.getFiles()) : suffix.test(item.name) && result.push(item);
            }
        }
    }
    var src_eachFolder = eachFolder;
    var LinkedList = function() {
        function LinkedList() {
            this.head = null;
            this.tail = null;
        }
        LinkedList.prototype.append = function(value) {
            var newNode = {
                value: value,
                next: null
            };
            null === this.head && (this.head = newNode);
            null === this.tail && (this.tail = newNode);
            this.tail.next = newNode;
        };
        LinkedList.prototype.prepend = function(value) {
            var newNode = {
                value: value,
                next: this.head
            };
            this.head = newNode;
            null === this.tail && (this.tail = newNode);
        };
        LinkedList.prototype.find = function(value) {
            var curNode = this.head;
            for (;null !== curNode; ) {
                if (curNode.value === value) {
                    return curNode;
                }
                curNode = curNode.next;
            }
            return null;
        };
        LinkedList.prototype.insertAfter = function(value, afterValue) {
            var curNode = this.find(afterValue);
            if (null !== curNode) {
                var newNode = {
                    value: value,
                    next: curNode.next
                };
                curNode.next = newNode;
            }
        };
        LinkedList.prototype.delete = function(value) {
            if (null !== this.head) {
                if (this.head.value !== value) {
                    var curNode = this.head;
                    for (;null !== curNode.next; ) {
                        if (curNode.next.value === value) {
                            curNode.next = curNode.next.next;
                            return;
                        }
                        curNode = curNode.next;
                    }
                } else {
                    this.head = this.head.next;
                }
            }
        };
        LinkedList.prototype.toArray = function() {
            var result = [];
            var curNode = this.head;
            for (;null !== curNode; ) {
                result.push(curNode.value);
                curNode = curNode.next;
            }
            return result;
        };
        return LinkedList;
    }();
    var global_LinkedList = LinkedList;
    function map(src, callbackfn) {
        var i = -1;
        var len = src.length;
        var result = [];
        for (;++i < len; ) {
            result.push(callbackfn(src[i], i, src));
        }
        return result;
    }
    var folder = new Folder("E:\\zd-es-lib\\src");
    var files = src_eachFolder(folder, /.ts$/);
    $.writeln(map(files, function(file) {
        return file.name;
    }).toString());
    var linkedList = new global_LinkedList;
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.prepend(0);
    linkedList.insertAfter(3, 2);
    linkedList.append(4);
    linkedList.append(5);
    linkedList.delete(4);
    $.writeln(linkedList.toArray());
    $.writeln(globalThis);
    $.writeln.apply($, [ "1" ]);
}(this);