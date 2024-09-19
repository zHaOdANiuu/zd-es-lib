import { getTag } from '../global/const';

export const timeToFrames = (time: number, fps: number) => Math.floor(time * fps);

export const framesToTime = (frame: number, fps: number) => Math.floor(frame / fps);

export const isPanel = (o: any): o is Panel => getTag(o) === '[object Panel]';

export const isGroup = (o: any): o is Group => getTag(o) === '[object Group]';

export const isWindow = (o: any): o is Window => getTag(o) === '[object Window]';

export const isListItem = (o: any): o is ListItem => getTag(o) === '[object ListItem]' && o.type === 'item';

export const isTreeViewNode = (o: any): o is TreeViewNode => getTag(o) === '[object ListItem]' && o.type === 'node';

export const isProperty = (o: any): o is Property => getTag(o) === '[object Property]';

export const isPropertyGroup = (o: any): o is PropertyGroup => getTag(o) === '[object isPropertyGroup]';

export const isCompItem = (o: any): o is CompItem => getTag(o) === '[object CompItem]';

export const isAVLayer = (o: any): o is AVLayer => getTag(o) === '[object AVLayer]';

export const isShapeLayer = (o: any): o is ShapeLayer => getTag(o) === '[object ShapeLayer]';

export const isTextLayer = (o: any): o is TextLayer => getTag(o) === '[object TextLayer]';

export const isCameraLayer = (o: any): o is CameraLayer => getTag(o) === '[object CameraLayer]';

export const isLightLayer = (o: any): o is LightLayer => getTag(o) === '[object LightLayer]';

export const isSolidSource = (o: any): o is SolidSource => getTag(o) === '[object SolidSource]';

export const isFolder = (o: any): o is Folder => getTag(o) === '[object Folder]';

export const isFile = (o: any): o is File => getTag(o) === '[object File]';
