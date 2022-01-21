import React from "react";
import './Watched.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function Watched(){

    const { watched, removeFromWatched } = useMovieSearchContext()

    return(
        <>  
            <div>
                <h2 className="watched-title-container">Your Watched List</h2>
            </div>
            {   watched[0] == undefined ?
                <div className="watched-empty-container">
                    <h1>Your Watched list is empty</h1>
                </div>
                :
                <div className="watched-movies-container">
                {
                    watched.map((movie)=>(
                        <div className="watchlist-movie" key={movie.id}>
                            <h3>{movie.title}</h3>
                            <h5>Release date: {movie.release_date}</h5>
                            <p>{movie.overview}</p>
                            <button onClick={()=>removeFromWatched(movie)}>Remove from Watched</button>
                        </div>
                    ))
                }
                </div>
            }
        </>
    )
}

export default Watched
