import React from 'react'
import { useMovieSearchContext } from '../context/MovieSearchContext'


function MovieSearched({ movie, onAdd, onRemove }) {
    
    const { watchList } = useMovieSearchContext()

    let movieIndex = watchList.findIndex(i => i.id === movie.id);

    return(
        <div key={movie.id} className='movie-search-container'>
            <h2>{movie.title}</h2>
            {
                watchList.findIndex(i => i.id === movie.id) === -1 &&
                <button onClick={()=>onAdd(movie)}>Add To Watch List</button>
            }  
            {
                watchList.findIndex(i => i.id === movie.id) > -1 &&
                <button onClick={()=>onRemove(movie)}>Remove From Watch List</button>
            } 
            <p>{movie.overview}</p>
            <img alt='Poster' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
        </div>
    )
}

export default MovieSearched