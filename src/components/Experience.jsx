import React, { useRef, useState } from 'react'
import Box from './Box'
import PlatformGenerator from './PlatformGenerator'
import { useFrame } from "react-three-fiber";

import { MeshBasicMaterial, SphereGeometry } from 'three'
import * as THREE from 'three'
import Player from './Player';



//game metrics
const gameH = 1200
const gameW = 800

const Experience = () => {
    const [playerJump, setPlayerJump] = useState(() => () => console.log("Initial Jump Function"));
    const playerRef = useRef();

    // Function to update the jump function
    const updateJumpFunction = (jumpFunction) => {
        setPlayerJump(() => jumpFunction);
        
    };


    useFrame((state) => {
        let elapsedTime = state.clock.elapsedTime

        

    })

    return (<>
        <Player
            ref={playerRef}
            updateJumpFunction={updateJumpFunction}
        />

        <PlatformGenerator
            gameW={1200}
            gameH={800}
            platformNumber={10}
            playerRef={playerRef}
            playerJump={playerJump}
        />




        {/* <Box /> */}

        {/* [0,0,0] reference for debug */}
        <mesh position={[0, 0, 1]}>
            <sphereGeometry args={[0.1, 32, 16]} />
            <meshBasicMaterial
                color={'red'}
            />
        </mesh>
    </>)
}

export default Experience