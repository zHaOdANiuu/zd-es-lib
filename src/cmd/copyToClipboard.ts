function copyToClipboard(text: string)
{
      if (Folder.fs === 'Windows')
            system.callSystem('cmd /c start /min /b cmd /c "echo ' + text + ' | clip"');
      else if (Folder.fs === 'Macintosh')
            system.callSystem('osascript -e \'' + 'echo "' + text + '" | pbcopy' + '\'');
      else throw 'Unsupported operating system.';
}

export default copyToClipboard;
