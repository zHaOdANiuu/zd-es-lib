import duffEach from '../util/duffEach'

function windowAutoResize(container: Group | Panel | Window, childSize: number[]) {
  const { margins, spacing } = container
  const numLineElement = (container.window.size[0] / childSize[0]) | 0
  duffEach(container.children, (e, i) => {
    e.location.x = (i % numLineElement) * childSize[0] + spacing
    e.location.y = (i / numLineElement) | (0 * childSize[1] + +margins)
  })
}

export default windowAutoResize
