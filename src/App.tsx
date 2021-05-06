const App = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="tomato" wireframe />
    </mesh>
  )
}

export default App
