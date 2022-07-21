import React from 'react'
import { Link } from 'react-router-dom'
import './MovieMiniature.css'

function MovieMiniatureActor(movie) {

    console.log(movie)

  return (
    <div className='movie-miniature-container' style={movie.movie.poster_path !== null? { backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.movie.poster_path})`, backgroundSize: 'cover' } : { backgroundImage: `url('/client/src/images/no_poster.jpeg'})`, backgroundSize: 'cover' }}>
        <div className='movie-miniature-details'>
            <p className='movie-miniature-details-title'>{ movie.movie.title } ({movie.movie.release_date.substring(0,4)})</p>
            <p className='movie-miniature-details-character'>representing {movie.movie.character}</p>
            <Link to={`/movie/${movie.movie.id}`}><button className='movie-miniature-details-button'>view more details</button></Link>
        </div>
        
    </div>
  )
}

export default MovieMiniatureActor