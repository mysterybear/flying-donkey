import { Canvas } from "@react-three/fiber"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Canvas>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
)
