import React from 'react'
import './MovieSearched.css'
import { Link } from 'react-router-dom'
import { useMovieSearchContext } from '../context/MovieSearchContext'


function MovieSearched({ movie, onAdd, onRemove }) {
    
    const { watchList, addToWatched, removeFromWatched, watched } = useMovieSearchContext()

    return(
        <div key={movie.id} className='movie-searched-container'>
            <h2>{movie.title}</h2>
            <p>Release date: {movie.release_date}</p>
            <div className='movie-searched-button-container'>
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
            <div className='movie-searched-overview-container'>
                <p className='movie-searched-overview'>{movie.overview}</p>
            </div>
            <div className='movie-searched-image-container'>
                <img alt='Poster' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
            </div>
            <Link to={`/movie/${movie.id}`}><button className='movie-searched-moredetails'>View more details</button></Link>
        </div>
    )
}

export default MovieSearched