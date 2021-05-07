import { ThreeEvent } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

const Sphere = () => {
  const [dragging, setDragging] = useState(false)

  const ref = useRef<THREE.Mesh>()

  const drag = (event: ThreeEvent<PointerEvent>) => {
    if (dragging && ref.current) {
      ref.current.scale.addScalar(-event.movementY / 100)
      ref.current.rotateY(event.movementX / 100)
    }
  }

  return (
    <mesh
      ref={ref}
      onPointerDown={() => void setDragging(true)}
      onPointerUp={() => void setDragging(false)}
      onPointerMove={drag}
    >
      <sphereBufferGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="tomato" wireframe />
    </mesh>
  )
}

const App = () => <Sphere />

export default App
