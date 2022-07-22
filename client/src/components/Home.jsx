import React from 'react'
import './Home.css'
import HomeIcon from '../images/home-icon.svg'

function Home(){

    return(        
        <div className="home-container">
            <div className='home-claims-container'>
                <img className='home-icon' src={HomeIcon} alt="home" />
                <div className='home-claims'>
                    <div className='home-claims-first-line'><h3>with </h3> <h1 id='logo'>watchlist</h1></div>
                    <h2>never forget to watch a movie you learned about</h2>
                    <h3>just SEARCH it and add it to your watchlist</h3>
                    <h1>start searching in the box above!</h1>
                </div>
            </div>
        </div>
    )
}

export default Home