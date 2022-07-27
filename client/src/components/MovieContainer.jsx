import React from "react";
import './MovieContainer.css'
import { useState, useEffect } from 'react'
import { useMovieSearchContext } from "../context/MovieSearchContext";
import { useParams } from 'react-router-dom'
import Movie from "./Movie";

function MovieContainer(){

    const [ load, setLoad ] = useState(true)
    const [ movie, setMovie ] = useState({})
    const { movieid } = useParams()
    const { error, setError } = useMovieSearchContext()

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then(resp => resp.json())
            .then(data => setMovie(data))
            .then(setLoad(false))
            .catch(e => setError("Oops! Something happened, please try again later"))
    }, [load])


    return(
        <div className="moviecontainer">
            {
                load && error.length < 1 ?
                <h1>Loading</h1>
                :
                error.length > 1 ?
                <h1>{error}</h1>
                :
                <Movie movie={movie} />
            }
        </div>
    )
}

export default MovieContainer