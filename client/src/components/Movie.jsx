import React from "react";
import './Movie.css'
import NoPoster from '../images/no_poster.jpeg'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function Movie({ movie }){

    const { watchList, watched, addToWatched, removeFromWatched, addToWatchList, removeFromWatchList } = useMovieSearchContext()
    const [ load, setLoad ] = useState(true)
    const [ movieCredits, setMovieCredits ] = useState({})
    const { movieid } = useParams()

    useEffect(()=>{
        setMovieCredits([])
        fetch(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then(resp => resp.json())
            .then(data => setMovieCredits(data))
            .then(console.log(movieCredits))
            .then(setLoad(false))
            
    },[movieid]) 
    
    return(
        <>
            { load ?
                <Loader/>
                :
                <div className="movie-details-container">
                    <div className="movie-details-poster-container">
                        <img alt='Poster' src={movie.poster_path === null ? NoPoster :'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
                    </div>
                    <div className="movie-details-data-container">
                        <div className="movie-details-data-title-container">
                            <h1>{movie.title}</h1>
                            <p>Release date: {movie.release_date}</p>
                        </div>
                        <hr></hr>
                        <div className="movie-details-data-buttons-container">
                            {
                                watchList.findIndex(i => i.id === movie.tmdbid) === -1 &&
                                <button className='movie-searched-button-watchlist' onClick={()=>addToWatchList(movie)}>add to watchlist</button>
                            }  
                            {
                                watchList.findIndex(i => i.id === movie.tmdbid) > -1 &&
                                <button className='movie-searched-button-watchlist' onClick={()=>removeFromWatchList(movie)}>remove from watchlist</button>
                            }
                            {
                                watched.findIndex(i => i.id === movie.tmdbid) === -1 &&
                                <button className='movie-searched-button-watched' onClick={()=>addToWatched(movie)}>add to watched</button>
                            }
                            {
                                watched.findIndex(i => i.id === movie.tmdbid) > -1 &&
                                <button className='movie-searched-button-watched' onClick={()=>removeFromWatched(movie)}>remove from watched</button>
                            }
                        </div>
                        <div className="movie-details-data-overview-container">
                            <h4>Overview</h4>
                            <hr></hr>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="movie-details-data-cast-container">
                            <h4>Cast</h4>
                            <hr></hr>
                            <div className="cast-container">
                                {movieCredits.cast === undefined || movieCredits.cast.length === 0
                                    ?
                                    <p>The cast of this movie could not be found</p> 
                                    :
                                    movieCredits.cast.map((cast)=>(
                                        <div className="member-container" key={cast.id}>
                                            <Link to={`/person/${cast.id}`}><p id='name'>{cast.name}</p></Link>
                                            <p id='job'>as {cast.character},</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="movie-details-data-crew-container">
                            <h4>Crew</h4>
                            <hr></hr>
                            <div className="crew-container">
                                {movieCredits.crew === undefined || movieCredits.crew.length === 0
                                    ? 
                                    <p>The crew of this movie could not be found</p> 
                                    :
                                    movieCredits.crew.map((crew)=>(
                                        <div className="member-container" key={crew.id}>
                                            <Link to={`/person/${crew.id}`}><p id='name'>{crew.name}</p></Link>
                                            <p id='job'> as {crew.job},</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </>
    )
}

export default Movie