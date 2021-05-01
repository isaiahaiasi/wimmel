import React, { useState } from 'react'

export default function MouseDetector() {
  // state for displaying mouse position
  const [mousePos, setMousePos] = useState();

  function handleMouseMove(event) {
    // TODO: create interface for this, so I don't have to depend
    // TODO: on the specifics of the onMouseMove event
    setMousePos({x: event.clientX, y: event.clientY});
  }

  // function given mouse move event
  return (
    <div onMouseMove={handleMouseMove} style={{height: "400px", width: "400px", background: "grey"}}>
      mousex: {mousePos?.x ?? "no mouse position!"}
      <br/>
      mousey: {mousePos?.y ?? "no mouse position!"}
    </div>
  )
}
