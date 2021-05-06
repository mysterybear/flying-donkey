import { OrbitControls } from "@react-three/drei"
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
        <OrbitControls {...(undefined as any)} />
      </Canvas>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
)
