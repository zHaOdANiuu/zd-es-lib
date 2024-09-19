function mouseoverOrOut(element: _Control, over: (e: MouseEvent) => void, out: (e: MouseEvent) => void)
{
      element.addEventListener('mousemove', over);
      element.addEventListener('mouseout', out);
}

export default mouseoverOrOut;
