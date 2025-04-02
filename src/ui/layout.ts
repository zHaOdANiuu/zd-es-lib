const layout = (e: Group | Panel | Window) => {
  e.layout.layout(true)
  e.layout.resize()
}

export default layout
