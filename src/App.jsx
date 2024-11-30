import React, { useRef } from 'react'
export default function App() {
    const canvas = useRef()

    console.log(canvas)

    return (
        <>
        <canvas ref={canvas} id="canvas"></canvas>
        </>
    )
}
import './js/pinball.js'