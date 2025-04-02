/**
 * Attaches event listeners to an element to handle right-click drag events.
 * @template T - The type of the element, extending _Control.
 * @param {T} element - The element to attach the event listeners to.
 * @param {MouseEventCallback<T>} moveCallback - The callback function to be called during mouse movement while the right button is pressed.
 * @param {MouseEventCallback<T>} [downCallback] - The optional callback function to be called when the right mouse button is pressed down.
 * @param {MouseEventCallback<T>} [upCallback] - The optional callback function to be called when the right mouse button is released.
 */
function mouseRightClickDrag<T extends _Control>(element: T, moveCallback: MouseEventCallback<T>, downCallback?: MouseEventCallback<T>, upCallback?: MouseEventCallback<T>)
{
      let leftClickStatus = false
      element.addEventListener('mousedown', function(this: T, e: MouseEvent)
      {
            leftClickStatus = true
            downCallback && downCallback.call(this, e)
      })
      element.addEventListener('mousemove', function(this: T, e: MouseEvent)
      {
            leftClickStatus && moveCallback.call(this, e)
      })
      element.addEventListener('mouseup', function(this: T, e: MouseEvent)
      {
            leftClickStatus = false
            upCallback && upCallback.call(this, e)
      })
      element.addEventListener('mouseout', () => { leftClickStatus = false })
}

export default mouseRightClickDrag
