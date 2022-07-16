import React from 'react'
import './MovieSearched.css'
import { Link } from 'react-router-dom'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import NoPoster from '../images/no_poster.jpeg'
import { useEffect } from 'react'


function MovieSearched({ movie }) {
    
    const { watchList, watched, reload, addToWatchList, addToWatched, removeFromWatchList, removeFromWatched } = useMovieSearchContext()

    useEffect(()=>{}, [reload])

    return(
        <div key={movie.id} className='movie-searched-container'>
            <h2>{movie.title} ({movie.release_date.substring(0,4)})</h2>
            <div className='movie-searched-button-container'>
            {
                watchList.findIndex(i => i.id === movie.id) === -1 &&
                <button onClick={()=>addToWatchList(movie)}>Add To Watch List</button>
            }  
            {
                watchList.findIndex(i => i.id === movie.id) > -1 &&
                <button onClick={()=>removeFromWatchList(movie)}>Remove From Watch List</button>
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
                <p className='movie-searched-overview'>{ 
                    movie.overview = null || movie.overview === "" ?
                    "No overview available for this film"
                    :
                    movie.overview
                    }
                </p>
            </div>
            <div className='movie-searched-image-container'>
                <img alt='Poster' src={ movie.poster_path === null ?
                    NoPoster
                    :               
                    'https://image.tmdb.org/t/p/w500' + movie.poster_path
                    }/>
            </div>
            <Link to={`/movie/${movie.id}`}><button className='movie-searched-moredetails'>View more details</button></Link>
        </div>
    )
}

export default MovieSearched