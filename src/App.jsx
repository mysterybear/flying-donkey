import { animated, useSpring } from "@react-spring/three"
import { useDrag } from "react-use-gesture"

const App = () => {
  const [{ movementX, movementY }, spring] = useSpring(() => ({
    movementX: 0,
    movementY: 0,
  }))

  const bind = useDrag(
    ({ event, movement: [movementX, movementY], down }) => {
      event.stopPropagation()
      if (down) {
        spring.start({ movementX, movementY })
      } else {
        spring.start({ movementX: 0, movementY: 0 })
      }
    },
    {
      transform: ([x, y]) => [x, -y],
    }
  )

  return (
    <animated.mesh
      rotation-y={movementX.to((v) => v / 10 / Math.PI)}
      scale={movementY.to((v) => 1 + v / 100)}
      {...bind()}
    >
      <sphereBufferGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="tomato" wireframe />
    </animated.mesh>
  )
}

export default App
