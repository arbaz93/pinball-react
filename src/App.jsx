import React, { useRef, useState, useEffect } from 'react'
import LoadingAnimation from './components/LoadingAnimation.jsx'
import { gameLoadTime } from './js/pinball.js'

export default function App() {
    const canvas = useRef()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, gameLoadTime)
    }, [])

    return (
        <>
        {!isLoaded && <LoadingAnimation />}
        <canvas ref={canvas} id="canvas"></canvas>
        </>
    )
}
import './js/pinball.js'
