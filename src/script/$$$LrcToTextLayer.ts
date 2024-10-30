import { isCompItem } from '../base/const';
import readLnFile from '../readLnFile';

interface lrcConfig
{
      time: number;
      text: string;
}

function $$$LrcToTextLayer(lrcFile: File): void
{
      app.beginUndoGroup('Import LRC to Text Layer');
      let targetComp = app.project.activeItem;
      if (!isCompItem(targetComp))
            targetComp = app.project.items.addComp(lrcFile.name, 1024, 1024, 1, 1, 99);
      targetComp.openInViewer();
      targetComp.layers.addText();
      let next = 0;
      const config = {} as lrcConfig;
      readLnFile(lrcFile, data =>
      {
            const time = data.substr(1, 9);
            if (data[0] !== '[' || !isNaN(+time)) return;
            config.time = currentFormatToTime(time, 99);
            config.text = data.substring(10);
            (targetComp.layer(1) as TextLayer).sourceText.setValue(new TextDocument(config.text));
            targetComp.layer(1).inPoint = next;
            targetComp.layer(1).outPoint = next += config.time || 1;
            targetComp.layer(1).duplicate();
      });
      targetComp.layer(1).remove();
      targetComp.duration = targetComp.layer(1).outPoint;
      app.endUndoGroup();
}

export default $$$LrcToTextLayer;
