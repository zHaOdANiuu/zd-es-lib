export const isPanel = (o: any): o is Panel => o instanceof Panel

export const isGroup = (o: any): o is Group => o instanceof Group

export const isWindow = (o: any): o is Window => o instanceof Window

export const isTreeView = (o: any): o is TreeView => o instanceof TreeView

export const isStaticText = (o: any): o is StaticText => o instanceof StaticText

export const isEditText = (o: any): o is EditText => o instanceof EditText

export const isButton = (o: any): o is Button => o instanceof Button

export const isCheckbox = (o: any): o is Checkbox => o instanceof Checkbox

export const isSlider = (o: any): o is Slider => o instanceof Slider

export const isCustom = (o: any): o is CustomView => o instanceof Custom

export const isImage = (o: any): o is Image => o instanceof Image

export const isListItem = (o: any): o is ListItem => o instanceof ListItem

export const isTreeViewNode = (o: any): o is TreeViewNode => isListItem(o) && o.type === 'node'
