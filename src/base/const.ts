export const HEX_CHARACTERS = '0123456789abcdef';

export const BASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const BASE_CHARACTERS_TAB: Record<string, number> = {
      'A': 0,
      'B': 1,
      'C': 2,
      'D': 3,
      'E': 4,
      'F': 5,
      'G': 6,
      'H': 7,
      'I': 8,
      'J': 9,
      'K': 10,
      'L': 11,
      'M': 12,
      'N': 13,
      'O': 14,
      'P': 15,
      'Q': 16,
      'R': 17,
      'S': 18,
      'T': 19,
      'U': 20,
      'V': 21,
      'W': 22,
      'X': 23,
      'Y': 24,
      'Z': 25,
      'a': 26,
      'b': 27,
      'c': 28,
      'd': 29,
      'e': 30,
      'f': 31,
      'g': 32,
      'h': 33,
      'i': 34,
      'j': 35,
      'k': 36,
      'l': 37,
      'm': 38,
      'n': 39,
      'o': 40,
      'p': 41,
      'q': 42,
      'r': 43,
      's': 44,
      't': 45,
      'u': 46,
      'v': 47,
      'w': 48,
      'x': 49,
      'y': 50,
      'z': 51,
      '0': 52,
      '1': 53,
      '2': 54,
      '3': 55,
      '4': 56,
      '5': 57,
      '6': 58,
      '7': 59,
      '8': 60,
      '9': 61,
      '+': 62,
      '/': 63,
      '=': 64
};

export const AE_MENU_COMMAND_ID = {
      Next: {
            NewText:             2836,
            NewSolid:            2038,
            NewLight:            2563,
            NewCamera:           2564,
            NewNullObject:       2767,
            NewShapeLayer:       3736,
            NewAdjustmentLayer:  2279,
            SaveAnimationPreset: 3075
      }
};

export const FILE_SUFFIX = {
      XML:        /\.xml$/,
      PNG:        /\.png$/,
      JPEG:       /\.jpg|jpeg$/,
      JSON:       /\.json$/,
      JavaScript: /\.js|jsx|jsxbin$/
};

export const FILE_WILDCARD = {
      MD:         'zd:*.md,',
      LRC:        'zd:*.lrc,',
      TXT:        'zd:*.txt,',
      MP3:        'zd:*.mp3,',
      PNG:        'zd:*.png,',
      JPEG:       'zd:*.jpg,zd:*.jpeg,',
      XML:        'zd:*.xml,',
      JSON:       'zd:*.json,',
      JavaScript: 'zd:*.js,zd:*.jsx,zd:*.jsxbin,'
};

export const MIN_AEPX =
      '<AfterEffectsProject><svap bdata=""/><head bdata="005d001d"/><nhed bdata=""/><nnhd bdata=""/><adfr bdata=""/><qtlg bdata=""/><gpuG><string></string></gpuG><sfnm><string></string><sfid bdata=""/></sfnm><mrid bdata=""/><acer bdata=""/><CPPl></CPPl><cpid bdata=""/><dwga bdata=""/><pcms bdata=""/><string></string><ProjectXMPMetadata></ProjectXMPMetadata><ExEn><string>extendscript</string></ExEn><Fold><fdta bdata=""/></Fold><wsns bdata=""/><wsnm bdata=""/><string></string><fcid bdata=""/><oacc bdata=""/><LSIf><AFsi bdata=""/></LSIf><LRdr><Rhed bdata=""/><Rout bdata=""/><list><lhd3 bdata="00d00bee000000000000000000000001000008c60000000100000001000000010000000000000000000000000000000000000000"/></list></LRdr><PTRE><ftwd bdata=""/></PTRE></AfterEffectsProject>';

export const MIN_IMAGE =
      '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x01\x03\x00\x00\x00\x01\x18\x07\t\x00\x00\x00\x03PLTE\x00\x00\x00?\x1A\x07\n\x00\x00\x00\x0BIDAT\b';

export const APP_PATH: string = BridgeTalk.getAppPath();

export const SUPPORT_FILES = File(APP_PATH).parent;

const arrayPrototype = Array.prototype;

const objectPrototype = Object.prototype;

export const undef = void 0;

export const nativeSlice = arrayPrototype.slice;

export function tempComp() { return app.project.items.addComp(randomString(), 4, 4, 1, 0, 0); }

export function timeToFrames(time: number, fps: number) { return Math.floor(time * fps); }

export function framesToTime(frame: number, fps: number) { return Math.floor(frame / fps); }

export function isReadonly <T extends object>(o: T, k: keyof T & string) { return o.reflect.find(k).type === 'readonly'; }

export function isReadwrite <T extends object>(o: T, k: keyof T & string) { return o.reflect.find(k).type === 'readwrite'; }

export function isNull(o: any): o is null { return o === null; }

export function isUndefined(o: any): o is undefined { return o === undef; }

export function isBoolean(o: any): o is boolean { return typeof o === 'boolean'; }

export function isNumber(o: any): o is number { return typeof o === 'number'; }

export function isString(o: any): o is string { return typeof o === 'string'; }

export function isFunction(o: any): o is AnyFunction { return typeof o === 'function'; }

function fixTag(tag: string) { return `[object ${tag}]`; }

export function isArray(o: any): o is any[] { return getTag(o) === fixTag('Array'); }

export function isFile(o: any): o is File { return getTag(o) === fixTag('File'); }

export function isFolder(o: any): o is Folder { return getTag(o) === fixTag('Folder'); }

export function isProperty(o: any): o is Property { return getTag(o) === fixTag('Property'); }

export function isPropertyGroup(o: any): o is PropertyGroup { return getTag(o) === fixTag('PropertyGroup'); }

export function isCompItem(o: any): o is CompItem { return getTag(o) === fixTag('CompItem'); }

export function isAVLayer(o: any): o is AVLayer { return getTag(o) === fixTag('AVLayer'); }

export function isShapeLayer(o: any): o is ShapeLayer { return getTag(o) === fixTag('ShapeLayer'); }

export function isTextLayer(o: any): o is TextLayer { return getTag(o) === fixTag('TextLayer'); }

export function isCameraLayer(o: any): o is CameraLayer { return getTag(o) === fixTag('CameraLayer'); }

export function isLightLayer(o: any): o is LightLayer { return getTag(o) === fixTag('LightLayer'); }

export function isSolidSource(o: any): o is SolidSource { return getTag(o) === fixTag('SolidSource'); }

export function isPanel(o: any): o is Panel { return getTag(o) === fixTag('Panel'); }

export function isGroup(o: any): o is Group { return getTag(o) === fixTag('Group'); }

export function isWindow(o: any): o is Window { return getTag(o) === fixTag('Window'); }

export function isTreeView(o: any): o is TreeView { return getTag(o) === fixTag('TreeView'); }

export function isStaticText(o: any): o is StaticText { return getTag(o) === fixTag('StaticText'); }

export function isEditText(o: any): o is EditText { return getTag(o) === fixTag('EditText'); }

export function isButton(o: any): o is Button { return getTag(o) === fixTag('Button'); }

export function isCheckbox(o: any): o is Checkbox { return getTag(o) === fixTag('Checkbox'); }

export function isSlider(o: any): o is Slider { return getTag(o) === fixTag('Slider'); }

export function isCustom(o: any): o is CustomView { return getTag(o) === fixTag('Custom'); }

export function isListItem(o: any): o is ListItem { return o && o.__proto__ === ListItem.prototype; }

export function isTreeViewNode(o: any): o is TreeViewNode { return isListItem(o) && o.type === 'node'; }

export function hasOwn <T extends object>(obj: T, key: string | keyof T): key is keyof T { return objectPrototype.hasOwnProperty.call(obj, key); }

export function getTag <T>(params: T): TypeString<T> { return objectPrototype.toString.call(params as any); }

export function isEmptyArray <T extends []>(arr: unknown[]): arr is T { return Boolean(arr.toString()) === false; }

export function isEmptyObject(object: AnyObject)
{
      for (const _ in object) return false;
      return true;
}

export function escapeRegExp(str: string) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

export function removeQuotes(str: string) { return str.replace(/['"]+/g, ''); }

export function removeSpaces(str: string) { return str.replace(/[\s\uFEFF\xA0]+/g, ''); }

export function removeComments(str: string) { return str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1'); }

export function compressCode(str: string) { return removeSpaces(removeComments(str)); }

export function reversedString(str: string) { return str.split('').reverse().join(''); }

export function randomString() { return Number(generateRandomNumber().toString().substring(2)).toString(32); }

export function random(min?: number, max?: number)
{
      if (isUndefined(min)) min = 0;
      if (isUndefined(max)) max = 1;
      return Math.floor(generateRandomNumber() * (max - min) + min);
}

export function degreesToRadians(degrees: number) { return degrees * Math.PI / 180; }

export function radiansToDegrees(radians: number) { return radians / Math.PI * 180; }

export function dihedralAngle(m: number, n: number) { return radiansToDegrees(2 * Math.asin(Math.cos(Math.PI / n) * (1 / Math.sin(Math.PI / m)))); }

export function clamp(min: number, value: number, max: number) { return min > value ? min : max < value ? max : value; }

export function iterateeCode(iterations: number, code: string)
{
      Function('', Array(1 + iterations).join(';' + code))();
}
