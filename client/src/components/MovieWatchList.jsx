import React from 'react'
import './MovieSearched.css'
import { Link } from 'react-router-dom'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import NoPoster from '../images/no_poster.jpeg'


function MovieWatchList({ movie, removeFromWatchList, addToWatched, removeFromWatched }) {
    
    const { watched } = useMovieSearchContext()

    console.log(movie)

    return(
            <div key={movie.id} className='movie-searched-container' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.movie.poster_path})`, backgroundSize: 'cover' }}>
            <div className='movie-seached-details'>
                <h2>{movie.title} ({movie.movie.release_date ? movie.movie.release_date.substring(0,4) : "Year not found"})</h2>
            <div className='movie-searched-button-container'>  
                <button className='movie-searched-button-watchlist' onClick={()=>removeFromWatchList(movie)}>remove from watchlist</button>
            {
                watched.findIndex(i => i.id === movie.id) === -1 &&
                <button className='movie-searched-button-watched' onClick={()=>addToWatched(movie)}>add to watched</button>
            }
            {
                watched.findIndex(i => i.id === movie.id) > -1 &&
                <button className='movie-searched-button-watched' onClick={()=>removeFromWatched(movie)}>remove from watched</button>
            }
            </div>
                <Link to={`/movie/${movie.id}`}><button className='movie-searched-moredetails'>wiew more details</button></Link>
            </div>
        </div>
    )
}

export default MovieWatchList