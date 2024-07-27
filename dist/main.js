(function(globalThis) {
    var activeCompItemEnviron = function(callback) {
        var activeItem = app.project.activeItem;
        if (activeItem instanceof CompItem) {
            callback(activeItem);
        }
    };
    function map(src, callbackfn) {
        var i = -1;
        var len = src.length;
        var result = [];
        while (++i < len) {
            result.push(callbackfn(src[i], i, src));
        }
        return result;
    }
    function duffDevice(items, process) {
        var length = items.length;
        var iterations = length % 8;
        var i = -1;
        while (iterations) {
            process(items[++i], i);
            --iterations;
        }
        iterations = Math.floor(length / 8);
        while (iterations) {
            process(items[++i], i);
            process(items[++i], i);
            process(items[++i], i);
            process(items[++i], i);
            process(items[++i], i);
            process(items[++i], i);
            process(items[++i], i);
            process(items[++i], i);
            --iterations;
        }
    }
    var JSON = function() {
        var parse = function(text) {
            try {
                return Function.call({}, "return " + text)();
            } catch (error) {
                throw error.line.toString() + "\n" + error.message;
            }
        };
        var parseArray = function(value) {
            var result = "[";
            var len = value.length;
            duffDevice(value, function(data, i) {
                switch (typeof data) {
                  case "object":
                    result += data === null ? "null" : stringify(data);
                    break;

                  case "function":
                    break;

                  case "undefined":
                    result += "null";
                    break;

                  default:
                    result += data;
                }
                if (i < len - 1) {
                    result += ",";
                }
            });
            return result + "]";
        };
        var parseType = function(value, key) {
            var result = "";
            var type = typeof value;
            if (type === "object") {
                result += '"' + key + '":' + (value === null && "null" || (Object.prototype.toString.call(value) === "[object Array]" && parseArray(value) || stringify(value)) + ",");
            } else {
                switch (type) {
                  case "function":
                    break;
                  case "undefined":
                    result += "null";
                    break;
                  case 'string':
                        result += '"' + key + '":' + '"' + value + '"' + ',';
                        break;
                  default:
                    result += '"' + key + '":' + value + ",";
                    break;
                }
            }
            return result;
        };
        var stringify = function(data) {
            var r = "{";
            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    r += parseType(data[key], key);
                }
            }
            return r.substring(0, r.length - 1) + "}";
        };
        return {
            parse: parse,
            stringify: stringify
        };
    }();
    function writeFile(path, content) {
        var file = path instanceof File ? path : new File(path);
        var folder = file.parent;
        if (!folder.exists) {
            folder.create();
        }
        return file.open("w") && file.write(content) && file.close();
    }
    function writeJSON(path, data) {
        return writeFile(path, JSON.stringify(data));
    }
    function propertyToJSON(property, file) {
        var result = {
            name: property.name,
            matchName: property.matchName,
            expression: property.expression,
            keys: []
        };
        var i = 0;
        var len = property.numKeys;
        while (i < len) {
            ++i;
            var inTemporalEase = property.keyInTemporalEase(i);
            var inTemporalEases = map(inTemporalEase, function(k) {
                return {
                    influence: k.influence,
                    speed: k.speed
                };
            });
            var outTemporalEase = property.keyOutTemporalEase(i);
            var outTemporalEases = map(outTemporalEase, function(k) {
                return {
                    influence: k.influence,
                    speed: k.speed
                };
            });
            result.keys.push({
                id: i,
                time: property.keyTime(i),
                value: property.keyValue(i),
                curve: {
                    inType: property.keyInInterpolationType(i),
                    inTemporalEases: inTemporalEases,
                    outType: property.keyOutInterpolationType(i),
                    outTemporalEases: outTemporalEases
                }
            });
        }
        writeJSON(file, result);
    }
    activeCompItemEnviron(function(compItem) {
        var layer = compItem.layer(1);
        propertyToJSON(layer.scale, Folder.desktop.fsName + "\\try.json");
    });
})(this);
