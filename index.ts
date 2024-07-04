import * as _ from './zd';

const folder = new Folder('E:\\zd-es-lib\\src');
const files = _.eachFolder(folder, /.ts$/);
$.writeln(_.map(files, file => file.name).toString());

const linkedList = new _.LinkedList();
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

$.writeln(...[ '1' ]);
