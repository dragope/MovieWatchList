import React from 'react'
import './MovieSearchContainer.css'
import MovieSearched from './MovieSearched'
import { useMovieSearchContext } from '../context/MovieSearchContext'

function MovieSearchContainer({ movie }){

    const { movieSearch, error } = useMovieSearchContext()

    return(
        <div className='moviesearch-container'>
        {   
            movieSearch.map((movie)=>(
                <MovieSearched 
                    key={movie.id} 
                    movie={movie}
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