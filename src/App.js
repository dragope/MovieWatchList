import React from 'react'
import { useState } from 'react';


function App() {
    
    const [movieSearch, setMovieSearch] = useState([])
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const [watchList, setWatchList] = useState([])

    const reset = () => {
      setLoad(true)
      setMovieSearch([])
      setError('')
    }

    const addToWatchList = (movie)=>{
      let movieIndex = movieSearch.findIndex(i => i.id === movie.id)
      setWatchList([...watchList, movieSearch[movieIndex]])
      console.log(watchList)
    }

    const searchMovie = async() =>{
      const input = document.querySelector('.input').value
      console.log(input)
      try{
        const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=77209655ed928ca6de56fa276ba23e5d&query=${input}`)
        if(resp.status === 200){
          const data = await resp.json()
          setMovieSearch(data.results)
          data.results.length < 1 && setError('The movie you searched for does not exist')
          setLoad(true)
        }else if(resp.status === 401){
          setError('Wrong movie search')
        } else if (resp.status === 404){
          setError('The movie you searched for does not exist')
        } else {
          setError('Oops! There was a mistake, please try again')
        }
      } catch(e){
        console.log(e)
      }
      console.log(movieSearch)
    }

    console.log(watchList)

  return (
    <>
      <div>
        <button onClick={reset}>Refresh</button>
        <input type="text" className='input' placeholder='Movie name or keyword'></input>
        <button onClick={searchMovie}>Search Movie</button>
      </div>
      { load === true &&
        movieSearch.length > 1 &&
        movieSearch.map((movie)=>(
          <div key={movie.id} className='movie-search-container'>
            <h2>{movie.title}</h2>
            <button onClick={()=>addToWatchList(movie)}>Add To Watch List</button>
            <p>{movie.overview}</p>
            <img alt='Poster' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
          </div>
        ))
      }
      {
        error.length > 1 &&

        <h3>{error}</h3>
      }
      
    </> 
  );
}

export default App;
