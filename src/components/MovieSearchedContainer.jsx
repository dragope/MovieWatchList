import React from 'react'
import MovieSearched from './MovieSearched';
import{ useMovieSearchContext } from '../context/MovieSearchContext'
import { Link } from 'react-router-dom'

function MovieSearchedContainer() {

    const { reset, searchMovie, loadWl, watchList, load, movieSearch, addToWatchList, error, removeFromWatchList } = useMovieSearchContext()

    return (
        <>
            <div>
                <button onClick={reset}>Refresh</button>
                <input type="text" className='input' placeholder='Movie name or keyword'></input>
                <button onClick={searchMovie}>Search Movie</button>
                <Link to='/watchlist'><button>Go to WatchList</button></Link>
            </div>
            {
                loadWl &&
                watchList.map((movie)=>(
                    <p key={movie.id}>{movie.title}</p>
                ))
            }
            { load === true &&
                movieSearch.length > 1 &&
                movieSearch.map((movie)=>(
                <MovieSearched key={movie.id} movie={movie} onAdd={addToWatchList} onRemove={removeFromWatchList}/>
                ))
            }
            {
                error.length > 1 &&

                <h3>{error}</h3>
            }
        </> 
    );
}

export default MovieSearchedContainer;
