import React from 'react'
import '../css/loading-animation.css'

export default function LoadingAnimation() {
  return (
    <div className='animation-container'>
        <div className='ball animate-bounce'></div>
        <div className='loading-text'>LOADING</div>
    </div>
  )
}
