import React from 'react'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import './MovieSearcher.css'
import MovieSearchContainer from './MovieSearchContainer';
function MovieSearcher() {

    const { reset, searchMovie, load, movieSearch } = useMovieSearchContext()

    return (
        <>
            <div className="moviesearcher-container">
                <input type="text" className='input' placeholder='Movie name'></input>
                <button onClick={searchMovie}>Search Movie</button>
                <button onClick={reset}>Refresh Search</button>
            </div>
            { load === true && movieSearch.length > 1 &&
                <MovieSearchContainer />
            }

        </> 
    );
}

export default MovieSearcher;
