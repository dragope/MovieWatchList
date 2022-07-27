import React from "react";
import { useMovieSearchContext } from '../context/MovieSearchContext'
import './WatchList.css'
import MovieWatchList from './MovieWatchList'
import Loader from "./Loader";
import EmptyList from '../images/empty-list.svg'
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
         <h2 className="watchlist-title-container">watchlist</h2>
        {   load ?
                <Loader />
                :
            <>
            {   watchList[0] === undefined ?

                <div className="watchlist-empty-container">
                        <img className="watchlist-empty-icon" src={EmptyList} alt="empty list icon" />
                        <h1>your watchlist is empty</h1>
                </div>
                :
                <div className="watchlist-movie-container">
                    {watchList.map((movie)=>(
                        <MovieWatchList 
                            movie={movie} 
                            removeFromWatchList={ removeFromWatchList }
                            addToWatched={ addToWatched }
                            removeFromWatched={ removeFromWatched }
                        />
                    ))}
                </div>
            }
            </>  
        }
        
        </>
    )
}

export default WatchList