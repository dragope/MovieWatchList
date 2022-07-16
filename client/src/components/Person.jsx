import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import NoImage from '../images/no_picture.png'
import './Person.css'

function Person() {

    const { personid } = useParams()
    const [ personBio, setPersonBio ] = useState({})
    const [ personMovies, setPesonMovies ] = useState([])
    const [ load, setLoad ] = useState(true)

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/person/${personid}?api_key=77209655ed928ca6de56fa276ba23e5d&language=en-US`)
            .then(resp => resp.json())
            .then(data => setPersonBio(data))
            .then(setLoad(false))
        fetch(`https://api.themoviedb.org/3/person/${personid}/movie_credits?api_key=77209655ed928ca6de56fa276ba23e5d&language=en-US`)
            .then(resp => resp.json())
            .then(data => setPesonMovies(data))
    }, [personid])

  return (
    <>
        {
            load ?

                <h1 className='loader'>LOADING</h1>
            :
                <>
                    <div className='person-details'>
                        <img className='person-details-picture' alt='Person' src={ personBio.profile_path === null ?
                        NoImage 
                        : 
                        'https://image.tmdb.org/t/p/w500' +  personBio.profile_path 
                        }/>
                        <div className='person-details-data'>
                            <h1 className='person-details-name'>{personBio.name}</h1>
                            <p className='person-details-birthday'>{personBio.birthday}</p>
                            <p className='person-details-biography'>{personBio.biography}</p>
                        </div>
                    </div>
                    <div className='person-details-movies'>
                        <h2 className='person-details-movies-header'>Movies</h2>
                        <div className='person-details-movies-container'>
                            <div className='person-details-movies-actor-container'>
                                <h3>As an Actor</h3>
                                {personMovies.cast === undefined || personMovies.cast.length === 0
                                    ? 
                                        <p>These movies could not be found</p> 
                                    :
                                        personMovies.cast.map((movie)=>(
                                            <div className='person-details-mappedmovie' key={movie.id}>
                                                <Link to={`/movie/${movie.id}`}><p className='person-details-movies-title'>{movie.title} ({movie.release_date.substring(0,4)})</p></Link><p>represeting {movie.character}</p>
                                            </div>
                                        ))
                                }
                            </div>
                            <div className='person-details-movies-crew-container'>
                                <h3>As Crew</h3>
                                {personMovies.crew === undefined || personMovies.crew.length === 0
                                    ? 
                                        <p>These movies could not be found</p> 
                                    :
                                        personMovies.crew.map((movie)=>(
                                            <div className='person-details-mappedmovie' key={movie.id}>
                                                <Link to={`/movie/${movie.id}`}><p className='person-details-movies-title'>
                                                    {movie.title}  ({movie.release_date.substring(0,4)})</p>
                                                </Link>
                                                <p>credited as {movie.job}</p>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </>

        }
    </>
  )
}

export default Person