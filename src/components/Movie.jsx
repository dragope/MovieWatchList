import React from "react";
import './Movie.css'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function Movie({ movie }){

    const { watchList, watched, onAdd, onRemove, addToWatched, removeFromWatched } = useMovieSearchContext()

    return(
        <div className="movie-details">
            <h3>{movie.title}</h3>
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
            <img alt='Poster' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
            <p>{movie.overview}</p>
        </div>
    )
}

export default Movie