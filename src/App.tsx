import {
  Line,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { flatten, map, range } from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"
import { useControls } from "leva"
import React, { Fragment, useMemo } from "react"
import useStore from "./store"

const { PI, max, sin } = Math

type PlottyProps = {
  f: (x: number) => number
  bounds?: {
    x?: [number, number]
    y?: [number, number]
  }
}
function Plotty({ f, bounds }: PlottyProps) {
  const [x0, x1] = [bounds?.x?.[0] ?? -5, bounds?.x?.[1] ?? 5]
  const points = pipe(
    range(x0, x1),
    map((v) => range(v * 10, v * 10 + 10)),
    flatten,
    map((v) => v / 10),
    map((x) => [x, f(x), 0] as [number, number, number])
  )
  return <Line points={points} />
}

const Graphy = () => {
  const { axes, divisions } = useStore()

  const [width, height] = useMemo(() => {
    const [x0, x1] = axes.x
    const [y0, y1] = axes.y
    return [x1 - x0, y1 - y0]
  }, [axes])

  return (
    <gridHelper args={[max(width, height), divisions]} rotation-x={PI / 2} />
  )
}

const Controls = () => {
  const set = useStore((store) => store.set)
  useControls(() => ({
    orthographic: {
      value: false,
      transient: false,
      onChange: (orthographic) => {
        set({ orthographic })
      },
    },
    xAxis: {
      min: -50,
      max: 50,
      value: [-50, 50],
      transient: false,
      onChange: (x) => {
        set((p) => ({ axes: { y: p.axes.y, x } }))
      },
    },
    yAxis: {
      min: -50,
      max: 50,
      value: [-50, 50],
      transient: false,
      onChange: (y) => {
        set((p) => ({ axes: { x: p.axes.x, y } }))
      },
    },
    divisions: {
      min: 5,
      max: 100,
      value: 100,
      transient: false,
      onChange: (v) => {
        set({ divisions: v })
      },
    },
  }))
  return null
}

const Camera = () => {
  const orthographic = useStore((store) => store.orthographic)
  return (
    <Fragment>
      <PerspectiveCamera
        position={[0, 0, 50]}
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
        <Plotty f={(x) => 10 * sin((1 / 10) * x)} bounds={{ x: [-50, 50] }} />
      </Canvas>
    </div>
  )
}

export default App
