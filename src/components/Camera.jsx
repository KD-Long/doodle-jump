import React, { useEffect, useState, useRef } from 'react'
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';

const Camera = ({ maxHeight }) => {
    const [camH, setCamH] = useState(0)


    const handleKeydown = (event) => {
        if (event.key == " ") {

            setCamH((prev) => prev + 1.0)


        }


    }

    // runs after the first render and on any change to dependancy values
    useEffect(() => {

        window.addEventListener('keydown', handleKeydown)

        //cleanup eventlistner on component unmount

        return () => {
            window.removeEventListener("keydown", handleKeydown)
        }

    }, [])

    // debug helper for camH
    useEffect(() => {
        // console.log(camH)
        // console.log(`Camera Position: [x, ${camH}, z]`);

    }, [camH])

    // OrthographicCamera sets game width to 10 units 
    // if pixels are 1200h 800w we need to set the height relative to the width to keep proportions

    let cameraWidth = 10
    let cameraHeight = cameraWidth*1.5 // this is hard coded will need to change this if we chaneg screen ratio


    return (
        <OrthographicCamera
            makeDefault
            left={-cameraWidth/2}       // Set according to your scene size
            right={cameraWidth/2}       // Set according to your scene size
            top={cameraHeight/2}         // Set according to your scene size
            bottom={-cameraHeight/2}     // Set according to your scene size
            near={0.1}
            far={100}
            position={[0, camH, 5]}

        // <PerspectiveCamera
        // makeDefault
        // fov={25}
        // near={0.1}
        // far={100}
        // position={[0, camH, 20]}
        />
    )
}

export default Camera