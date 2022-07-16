import React from 'react'
import { useMovieSearchContext } from '../context/MovieSearchContext'
import { useState } from 'react';
import './MovieSearcher.css'
import MovieSearchContainer from './MovieSearchContainer';
import Home from './Home';

function MovieSearcher() {

    const { movieSearch, setMovieSearch, setError, error } = useMovieSearchContext()
    const [loader, setLoader] = useState()

    const reset = () => {
        setLoader()
        setMovieSearch([])
        setError('')
      }

    const searchMovie = async() =>{
        setError('')
        setLoader(false)
        const input = document.querySelector('.input').value
        try{
            const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=77209655ed928ca6de56fa276ba23e5d&query=${input}&page=1`)
            if(resp.status === 200){
            const data = await resp.json()
            setMovieSearch(data.results)
            data.results.length < 1 && setError('The movie you searched does not exist')
            setLoader(true)
            }else if(resp.status === 401){
            setError('Wrong movie search')
            } else if (resp.status === 404){
            setError('The movie you searched for does not exist')
            } else {
            setError('Oops! There was a mistake, please try again')
            }
        } catch(error){
            console.error(error)
        }
    }

    return (
        <>
            <div className="moviesearcher-container">
                <input type="text" className='input' placeholder='Movie name'></input>
                <button onClick={searchMovie}>Search Movie</button>
                <button onClick={reset}>Refresh Search</button>
            </div>
            {   movieSearch[0] === undefined && error.length < 1
                ?
                <Home/>
                :
                error
                ?
                <h1 className="moviesearcher-error">{error}</h1>
                :
                loader === false
                ?
                <h1 className='loader'>LOADING</h1>
                :
                (loader === true || loader === undefined) && movieSearch.length >= 1 &&
                <MovieSearchContainer />
            }

        </> 
    );
}

export default MovieSearcher;
