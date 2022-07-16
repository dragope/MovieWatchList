import React from "react";
import { useMovieSearchContext } from '../context/MovieSearchContext'
import './WatchList.css'
import MovieWatchList from './MovieWatchList'
import { useEffect, useState } from "react";

function WatchList(){

    const { watchList, getWatchlist, reload, removeFromWatchList, addToWatched, removeFromWatched } = useMovieSearchContext()

    const [ load, setLoad ] = useState(true)

    useEffect(async ()=>{
        await getWatchlist()
        setLoad(false) 
    }, [reload])

    return(
        <>
        <div>
            <h2 className="watchlist-title-container">Your WatchList</h2>
        </div>
        
        {   watchList[0] === undefined ?
            <div className="watchlist-empty-container">
                    <h1>Your WatchList is empty</h1>
            </div>
            :
            <div className="watchlist-movie-container">
            {   load ?
                <h1>Loading...</h1>
                :
                watchList.map((movie)=>(
                    <MovieWatchList 
                        movie={movie} 
                        removeFromWatchList={ removeFromWatchList }
                        addToWatched={ addToWatched }
                        removeFromWatched={ removeFromWatched }
                    />
                ))
            }
            </div>
        }
        
        </>
    )
}

export default WatchList