import React from "react"
import goob from "./assets/goob.png"

function App() {
  return (
    <div>
      <h1>Welcome to React From Scratch!</h1>
      <p>Today's date is: {new Date().toDateString()}</p>
      <figure>
        <img src={goob} alt="goob" />
        <figcaption>
          <i>hhhhhhh...</i> The goob says in anticipation.
        </figcaption>
      </figure>
    </div>
  )
}

export default App
