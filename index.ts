const folder = new Folder('E:\\zd-es-lib\\src');
const files = eachFolder(folder, /.ts$/);
$.write(map(files, file => file.name).toString());

const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);

linkedList.prepend(0);
linkedList.insertAfter(3, 2);
linkedList.append(4);
linkedList.append(5);
linkedList.delete(4);

$.write(linkedList.toArray());
$.write(globalThis);
