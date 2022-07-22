import React, { useEffect } from "react";
import './Watched.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import MovieWatched from "./MovieWatched";
import EmptyList from '../images/empty-list.svg'
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
                <h2 className="watched-title-container">watched</h2>
            {   watched[0] === undefined ?
                <div className="watched-empty-container">
                    <img className='watched-empty-icon' src={EmptyList} alt="" />
                    <h1>your watched list is empty</h1>
                </div>
                :
                <div className="watched-movies-container">
                {   load ?
                    <h1>loading...</h1>
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
