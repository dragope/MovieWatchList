import React from "react";
import { useMovieSearchContext } from '../context/MovieSearchContext'
import './WatchList.css'

function WatchList(){

    const { watchList, removeFromWatchList, addToWatched, removeFromWatched, watched } = useMovieSearchContext()

    return(
        <>
        <div>
            <h2 className="watchlist-title-container">Your WatchList</h2>
        </div>
        {   watchList[0] == undefined ?
            <div className="watchlist-empty-container">
                    <h1>Your WatchList is empty</h1>
            </div>
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