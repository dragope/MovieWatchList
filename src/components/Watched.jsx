import React from "react";
import './Watched.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import MovieWatched from "./MovieWatched";

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
                        <MovieWatched movie={movie} removeFromWatched={ removeFromWatched } />
                    ))
                }
                </div>
            }
        </>
    )
}

export default Watched
