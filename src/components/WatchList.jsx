import React from "react";
import { useMovieSearchContext } from '../context/MovieSearchContext'
import './WatchList.css'
import MovieWatchList from './MovieWatchList'

function WatchList(){

    const { watchList, removeFromWatchList, addToWatched, removeFromWatched } = useMovieSearchContext()

    return(
        <>
        <div>
            <h2 className="watchlist-title-container">Your WatchList</h2>
        </div>
        <div className="watchlist-movie-container">
        {   watchList[0] == undefined ?
            <div className="watchlist-empty-container">
                    <h1>Your WatchList is empty</h1>
            </div>
            :
            
            watchList.map((movie)=>(
                <MovieWatchList 
                    movie={movie} 
                    removeFromWatchList={removeFromWatchList}
                    addToWatched={addToWatched}
                    removeFromWatched={removeFromWatched}


                />
            ))
        }
        </div>
        </>
    )
}

export default WatchList