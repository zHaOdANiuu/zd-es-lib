/** 复制文本到粘贴板 */
function copyToClipboard(text: string)
{
      if (Folder.fs === 'Windows')
            system.callSystem('cmd /c start /min /b cmd /c "echo ' + text + ' | clip"')
      else if (Folder.fs === 'Macintosh')
            system.callSystem('osascript -e \'' + 'echo "' + text + '" | pbcopy' + '\'')
      else alert('Unsupported operating system.')
}

export default copyToClipboard
