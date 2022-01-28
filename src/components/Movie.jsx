import React from "react";
import './Movie.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

function Movie({ movie }){

    const { watchList, watched, onAdd, onRemove, addToWatched, removeFromWatched, movieCredits, setMovieCredits } = useMovieSearchContext()
    const [ load, setLoad ] = useState(true)
    const { movieid } = useParams()

    useEffect(()=>{
        setMovieCredits([])
        fetch(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=77209655ed928ca6de56fa276ba23e5d&language=en-US`)
        .then(resp => resp.json())
        .then(data => setMovieCredits(data))
        .then(setLoad(false))
    },[movieid])
 
    console.log(movie)
    
    return(
        <>
            { load ?
                <h1 className='loader'>LOADING</h1>
                :
                <div className="movie-details-container">
                    <div className="movie-details-poster-container">
                        <img alt='Poster' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
                    </div>
                    <div className="movie-details-data-container">
                        <div className="movie-details-data-title-container">
                            <h1>{movie.title}</h1>
                            <p>Release date: {movie.release_date}</p>
                        </div>
                        <div className="movie-details-data-buttons-container">
                            {
                                watchList.findIndex(i => i.id === movie.id) === -1 &&
                                <button onClick={()=>onAdd(movie)}>Add To Watch List</button>
                            }  
                            {
                                watchList.findIndex(i => i.id === movie.id) > -1 &&
                                <button onClick={()=>onRemove(movie)}>Remove From Watch List</button>
                            }
                            {
                                watched.findIndex(i => i.id === movie.id) === -1 &&
                                <button onClick={()=>addToWatched(movie)}>Add to Watched</button>
                            }
                            {
                                watched.findIndex(i => i.id === movie.id) > -1 &&
                                <button onClick={()=>removeFromWatched(movie)}>Remove from Watched</button>
                            }
                        </div>
                        <div className="movie-details-data-overview-container">
                            <h4>Overview:</h4>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="movie-details-data-cast-container">
                            <h4>Cast:</h4>
                            <div className="cast-container">
                                {movieCredits.cast === undefined || movieCredits.cast.length === 0
                                    ?
                                    <p>The cast of this movie could not be found</p> 
                                    :
                                    movieCredits.cast.map((cast)=>(
                                        <div className="member-container" key={cast.id}>
                                            <p id='name'>{cast.name}</p>
                                            <p id='job'>as {cast.character},</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="movie-details-data-crew-container">
                            <h4>Crew:</h4>
                            <div className="crew-container">
                                {movieCredits.crew === undefined || movieCredits.crew.length === 0
                                    ? 
                                    <p>The crew of this movie could not be found</p> 
                                    :
                                    movieCredits.crew.map((crew)=>(
                                        <div className="member-container" key={crew.id}>
                                            <p id='name'>{crew.name}</p>
                                            <p id='job'> as {crew.job},</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </>
    )
}

export default Movie