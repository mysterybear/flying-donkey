import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useControls } from "leva"
import React, { Fragment, useEffect, useMemo } from "react"
import useStore from "./store"

const { PI, max } = Math

const Graphy = () => {
  const { axes, divisions } = useStore()

  const [width, height] = useMemo(() => {
    const [x0, x1] = axes.x
    const [y0, y1] = axes.y
    return [x1 - x0, y1 - y0]
  }, [axes])

  return (
    <mesh>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial color="tomato" />
      <gridHelper args={[max(width, height), divisions]} rotation-x={PI / 2} />
    </mesh>
  )
}

const Controls = () => {
  const { xAxis, yAxis, divisions, orthographic } = useControls({
    orthographic: true,
    xAxis: {
      min: -50,
      max: 50,
      value: [-10, 10],
    },
    yAxis: {
      min: -50,
      max: 50,
      value: [-10, 10],
    },
    divisions: {
      min: 5,
      max: 500,
      value: 20,
    },
  })
  const set = useStore((store) => store.set)
  useEffect(() => {
    set({ orthographic, axes: { x: xAxis, y: yAxis }, divisions })
  }, [set, orthographic, xAxis, yAxis, divisions])
  return null
}

const Camera = () => {
  const orthographic = useStore((store) => store.orthographic)
  return (
    <Fragment>
      <PerspectiveCamera
        position={[0, 0, 2.5]}
        fov={100}
        makeDefault={!orthographic}
      />
      <OrthographicCamera
        position={[0, 0, 2.5]}
        zoom={100}
        makeDefault={orthographic}
      />
    </Fragment>
  )
}

const App = () => {
  return (
    <div className="container">
      <Canvas>
        <Graphy />
        <Camera />
        <Controls />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
export default App
