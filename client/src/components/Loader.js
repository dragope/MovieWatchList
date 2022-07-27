import React from 'react'
import './Loader.css'
import LoaderImage from '../images/empty-list.svg'

function Loader() {
  return (
    <div className='loader-container'>
        <div className='loader-image-container'>
            <img className='loader-image' src={LoaderImage} alt="loader" />
        </div>
        <h1 className='loader-text'>Loading...</h1>

    </div>
  )
}

export default Loader