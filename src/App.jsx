
import './App.css'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './components/Experience'
import Camera from './components/Camera'


function App() {


  return (
    <>
      <div className="canvas-container">
        <Canvas
          
          // note this fixes the tone mapping (colors look better)
          onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }}
          shadows={true}
        >
          <Camera maxHeight={0}/>
          <Experience />
        </Canvas>
      </div>
    </>
  )
}

export default App
