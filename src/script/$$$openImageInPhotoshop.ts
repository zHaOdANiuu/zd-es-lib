import { eachSelectedLayers } from '../Ae';
import { isAVLayer, isFile } from '../base/const';
import exe from '../exe';

function $$$openImageInPhotoshop()
{
      const appSpecifier = 'photoshop';
      eachSelectedLayers(layer =>
      {
            if (!isAVLayer(layer)) throw '请选择一个素材图层';
            const mainSource = layer.source.mainSource;
            if (!isFile(mainSource.file)) throw '素材图层没有文件源';
            const img = mainSource.file;
            exe(appSpecifier, 'app.open(' + img.toSource() + ')', () =>
            {
                  BridgeTalk.isRunning(appSpecifier)
                        ? system.callSystem(BridgeTalk.getAppPath(appSpecifier))
                        : BridgeTalk.bringToFront(appSpecifier);
            });
      });
}

export default $$$openImageInPhotoshop;
