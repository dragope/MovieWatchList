import React from "react";
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { Link } from 'react-router-dom'

function WatchList(){

    const { watchList, removeFromWatchList, addToWatched, removeFromWatched, watched } = useMovieSearchContext()

    return(
        <>
        <h2>Your WatchList</h2>
        {   watchList[0] == undefined ?
            <h4>Your Watch List is empty</h4>
            :
            watchList.map((movie)=>(
                <div className="watchlist-movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <h5>Release date: {movie.release_date}</h5>
                    <p>{movie.overview}</p>
                    {
                        watched.findIndex(i => i.id === movie.id) === -1 &&
                        <button onClick={()=>addToWatched(movie)}>Add to Watched</button>
                    }
                    {
                        watched.findIndex(i => i.id === movie.id) > -1 &&
                        <button onClick={()=>removeFromWatched(movie)}>Remove from Watched</button>
                    }
                    <button onClick={()=>removeFromWatchList(movie)}>Remove from WatchList</button>
                </div>
            ))
        }

        </>
    )
}

export default WatchList