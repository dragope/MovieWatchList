import React, { useEffect } from "react";
import './Watched.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import MovieWatched from "./MovieWatched";
import { useState } from "react";

function Watched(){

    const { watched, reload, getWatched, removeFromWatched } = useMovieSearchContext()
    
    const [ load, setLoad ] = useState(true)

    useEffect(async ()=>{
        await getWatched()
        setLoad(false)
    }, [reload])

    return(
        <>  
            <div>
                <h2 className="watched-title-container">Your Watched List</h2>
            </div>
            {   watched[0] === undefined ?
                <div className="watched-empty-container">
                    <h1>Your Watched list is empty</h1>
                </div>
                :
                <div className="watched-movies-container">
                {   load ?
                    <h1>Loading...</h1>
                    :
                    watched.map((movie)=>(
                        <MovieWatched 
                            key={ movie.id } 
                            movie={ movie } 
                            removeFromWatched={ removeFromWatched }
                        />
                    ))
                }
                </div>
            }
        </>
    )
}

export default Watched
