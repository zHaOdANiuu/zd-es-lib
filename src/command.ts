import { AE_MENU_COMMAND_ID } from './const'

export const executeCutCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.CUT)
}

export const executeCopyCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.COPY)
}

export const executeCopyWithPropertyLinksCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.COPY_WITH_PROPERTY_LINKS)
}

export const executePasteCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.PASTE)
}

export const executeDuplicateCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.DUPLICATE)
}

export const executeUndoCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.UNDO)
}

export const executeSaveAnimationPresetCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.SAVE_ANIMATION_Preset)
}

export const executeAudioToKeyframesCommand = () => {
  app.executeCommand(AE_MENU_COMMAND_ID.CONVERT_AUDIO_TO_KEYFRAMES)
}
