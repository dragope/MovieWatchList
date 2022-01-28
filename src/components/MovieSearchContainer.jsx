import React from 'react'
import './MovieSearchContainer.css'
import MovieSearched from './MovieSearched'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function MovieSearchContainer({ movie }){

    const { movieSearch, addToWatchList, removeFromWatchList, addToWatched, removeFromWatched, error } = useMovieSearchContext()

    return(
        <div className='moviesearch-container'>
        {   
            movieSearch.map((movie)=>(
                <MovieSearched 
                    key={movie.id} 
                    movie={movie} 
                    onAdd={addToWatchList} 
                    onRemove={removeFromWatchList}
                    addToWatched={addToWatched}
                    removeFromWatched={removeFromWatched}

                />
            ))
        }
        {
            error.length > 1 &&

            <h3>{error}</h3>
        }
        </div>
    )
}

export default MovieSearchContainer