import React from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const Box = () => {
    return (

        <mesh>
            <boxGeometry args={[10, 5, 5]} />
            <meshBasicMaterial color={'orange'} />
        </mesh>

    )
}

export default Box