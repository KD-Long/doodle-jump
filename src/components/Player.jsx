import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { useFrame } from "react-three-fiber";


const GRAVITY = -9.8;  // Gravitational acceleration (in meters/second^2)
const JUMP_VELOCITY = 8; // Initial jump velocity
const STRAFE_VELOCITY = 5 * 0.02;
const PLAYER_WIDTH = 1;

const Player = forwardRef(({ updateJumpFunction }, ref) => {
    const pRef = useRef()
    const [px, setPx] = useState(0)
    const [py, setPy] = useState(0)
    const [pvy, setPvy] = useState(0)
    const [pvx, setPvx] = useState(0)



    const keys = useRef({});  // To track which keys are held down    

    const handleKeyDown = (event) => {
        keys.current[event.key] = true;  // Mark the key as pressed
    };

    const handleKeyUp = (event) => {
        keys.current[event.key] = false;  // Mark the key as released
    };

    const jump = () => {
        // console.log("Player jumped!");
        // set last jump ehight
        pRef.current.lastJumpHeight = Math.max(pRef.current.position.y, pRef.current.lastJumpHeight)
        setPvy(JUMP_VELOCITY * 0.02)
    };

    // on render pass the jumpo function to the parent
    useEffect(() => {
        updateJumpFunction(jump); // Pass the jump function to the parent

        //set minimum
        pRef.current.lastJumpHeight = -6 // starting positon set 

    }, []);

    //exposing ref externally to parent
    useEffect(() => {
        if (ref) {
            ref.current = pRef.current; // Expose the mesh ref to the parent
        }
    }, [ref]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }

    }, [])


    useFrame((state, delta) => {


        // Horizontal movement based on keys
        // Note** there is bug here where right is

        if (keys.current['ArrowRight'] || keys.current['d'] || keys.current['D']) {
            setPvx(STRAFE_VELOCITY);  // Move right
        } else if (keys.current['ArrowLeft'] || keys.current['a'] || keys.current['A']) {
            setPvx(-STRAFE_VELOCITY);  // Move left
        } else {
            setPvx(0);  // Stop moving if no key is pressed
        }





        // apply gravity to velocity gravity
        setPvy((prev) => prev + GRAVITY * delta * 0.02)



        //Jump condition (collision later)
        if (pRef.current.position.y < -7) {
            setPvy(JUMP_VELOCITY * 0.02)
        }

        // update player position
        // set max on sides
        pRef.current.position.x = Math.max(-5 + PLAYER_WIDTH / 2, Math.min(pRef.current.position.x + pvx, 5 - PLAYER_WIDTH / 2))
        pRef.current.position.y += pvy
        pRef.current.pvy = pvy

    })

    return (
        <>
            <mesh
                ref={pRef}
                position={[0, -5, 0]}
                scale={[0.5, 0.5, 0.5]}
            >
                <capsuleGeometry args={[PLAYER_WIDTH, 1, 4, 8]} />
                <meshBasicMaterial color={'orange'} />
            </mesh>
        </>
    )
})

export default Player