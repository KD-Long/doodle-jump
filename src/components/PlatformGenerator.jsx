import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from "react-three-fiber";

const PlatformGenerator = ({ gameW, gameH, platformNumber, playerRef, playerJump }) => {
    let platforms = []
    for (let i = 0; i < platformNumber; i++) {
        let rx = (Math.random() - 0.5) * 4
        let ry = (Math.random() - .5) * 4
        let platPosition = [rx, ry, 0]

        platforms.push(platPosition)
    }


    return (
        <>
            {platforms.map((p, index) => {
                return <Platform
                    key={index}
                    gameW={1200}
                    gameH={800}
                    position={p}
                    playerRef={playerRef}
                    playerJump={playerJump}
                />
            })}
        </>
    )
}

// We will assign a bounding box to each platform and emmit a colision when intersect with player ref
// this will then be passed to the experience to handle and eventually trigger player jump or
// --- instead we could pass function down from player to trigger jumnp

const Platform = ({ gameW, gameH, position, playerRef, playerJump }) => {
    const platformRef = useRef()
    const platformBoundingBox = useRef(new THREE.Box3())


    //these are now in game measurments where the camera/game width is 10 units
    let platformW = 10 * (8 / 35) //gameW / gameH * 0.5
    let heighgtW = 0.5 // gameH / gameW * 0.25



    useFrame((stats, delta) => {


        // if platform and player exist then -->
        if (platformBoundingBox.current && platformRef.current && playerRef) {

            platformBoundingBox.current.setFromObject(platformRef.current)

            const playerBoundingBox = new THREE.Box3().setFromObject(playerRef.current)

  
            // Check colision
            if (playerBoundingBox.intersectsBox(platformBoundingBox.current)) {
                // pass this logic back to player component to handle jump
                if(playerRef.current.pvy<0){
                    playerJump();
                }
                

            }

        }

    })

    // updates the position of the bounding box to follow the platform


    return (<>
        <mesh
            ref={platformRef}
            position={position}
        >
            <boxGeometry args={[platformW, heighgtW, 1]} />
            <meshBasicMaterial color={'green'} />
        </mesh>
        {/* TEMP WIRE FRAME */}
        <mesh position={position} >
            <boxGeometry args={[platformW, heighgtW, 1]} />
            <meshBasicMaterial wireframe color={'white'} />
        </mesh>
    </>

    )

}


export default PlatformGenerator
