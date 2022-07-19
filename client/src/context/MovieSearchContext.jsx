import React, { useState, useContext, createContext } from 'react'

const MovieSearchContext = createContext([])

export const useMovieSearchContext = () => useContext(MovieSearchContext)

function MovieSearchContextProvider({children}){

    const [movieSearch, setMovieSearch] = useState([])
    const [error, setError] = useState('')
    const [watchList, setWatchList] = useState([])
    const [watched, setWatched] = useState([])
    const [reload, setReload] = useState(true)
    const [user, setUser] = useState(null)

    function getWatchlist(){
        fetch(`/api/watchlist/${user.id}`, {mode:'cors'})
            .then(res => res.json())
            .then(movies => setWatchList(movies))
            .catch(err => console.error(err))
    }

   async function getWatched (){
        await fetch(`/api/watched/${user.id}`, {mode:'cors'})
            .then(res => res.json())
            .then(movies => setWatched(movies))
            .catch(err => console.error(err))
    }

    const addToWatchList = async (movie)=>{
        await fetch('/api/addtowatchlist', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                id: movie.id, 
                title: movie.title,
                movie: movie,
                user: user.id
            }),
            mode: 'cors'
        })
        .then(getWatchlist())
    }

    const addToWatched = async (movie)=>{
        await fetch('/api/addtowatched', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                id: movie.id, 
                title: movie.title,
                movie: movie,
                user: user.id
            }),
            mode: 'cors'
        })
            .then(getWatched())
    }

    const removeFromWatchList = async (movie)=>{
        await fetch(`/api/deletefromwatchlist/${user.id}/${movie.id}`, {
            method: "DELETE",
            mode: 'cors'
        })
        .then(getWatchlist())
        .then(setReload(!reload))
        .catch(err => console.error("error: " + err))
    }    

    const removeFromWatched = async (movie)=>{
        await fetch(`/api/deletefromwatched/${user.id}/${movie.id}`, {
            method: "DELETE",
            mode: 'cors'
        })
        .then(getWatched())
        .then(setReload(!reload))
        .catch(err => console.error("error: " + err))
    }

    return(
        <MovieSearchContext.Provider value={{
            addToWatchList,
            removeFromWatchList,
            movieSearch, 
            setMovieSearch,
            error, 
            setError, 
            watchList,
            setWatchList,
            watched,
            setWatched,
            addToWatched,
            removeFromWatched,
            getWatched,
            getWatchlist,
            reload,
            user,
            setUser
        }}>
        {children}
        </MovieSearchContext.Provider>
    )
}

export default MovieSearchContextProvider