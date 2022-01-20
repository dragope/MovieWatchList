import React from "react";
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { Link } from 'react-router-dom'

function WatchList(){

    const { watchList, removeFromWatchList } = useMovieSearchContext()

    return(
        <>
        <Link to="/"><button>Continue Searching</button></Link>
        {   watchList[0] == undefined ?
            <h4>Your Watch List is empty</h4>
            :
            watchList.map((movie)=>(
                <div className="watchlist-movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <h5>Release date: {movie.release_date}</h5>
                    <p>{movie.overview}</p>
                    <button onClick={()=>removeFromWatchList(movie)}>Remove from WatchList</button>
                </div>
            ))
        }

        </>
    )
}

export default WatchList