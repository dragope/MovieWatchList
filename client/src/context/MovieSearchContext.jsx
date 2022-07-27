import React, { useState, useContext, createContext } from 'react'
import { auth } from '../firebase/firebase-config'

const MovieSearchContext = createContext([])

export const useMovieSearchContext = () => useContext(MovieSearchContext)

function MovieSearchContextProvider({children}){

    const [movieSearch, setMovieSearch] = useState([])
    const [error, setError] = useState('')
    const [watchList, setWatchList] = useState([])
    const [watched, setWatched] = useState([])
    const [reload, setReload] = useState(true)
    const [user, setUser] = useState(null)
    const [modal, setModal] = useState('')

    function getWatchlist(){
        fetch(`${process.env.REACT_APP_BACK_URL}/api/watchlist/${auth.currentUser.uid}`, {mode:'cors'})
            .then(res => res.json())
                .then(movies => setWatchList(movies))
            .catch(err => console.error(err))
    }

   async function getWatched (){
        await fetch(`${process.env.REACT_APP_BACK_URL}/api/watched/${auth.currentUser.uid}`, {mode:'cors'})
            .then(res => res.json())
            .then(movies => setWatched(movies))
            .catch(err => console.error(err))
    }

    const addToWatchList = async (movie)=>{
        await fetch(`${process.env.REACT_APP_BACK_URL}/api/addtowatchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                id: movie.id, 
                title: movie.title,
                movie: movie,
                user: auth.currentUser.uid
            }),
            mode: 'cors'
        })
        .then(getWatchlist())
        .then(setModal(`${movie.title} has been added to your watchlist`))
        .then(openModal())
    }

    const addToWatched = async (movie)=>{
        await fetch(`${process.env.REACT_APP_BACK_URL}/api/addtowatched`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                id: movie.id, 
                title: movie.title,
                movie: movie,
                user: auth.currentUser.uid
            }),
            mode: 'cors'
        })
            .then(getWatched())
            .then(setModal(`${movie.title} has been added to your watched list`))
            .then(openModal())
    }

    const removeFromWatchList = async (movie)=>{
        await fetch(`${process.env.REACT_APP_BACK_URL}/api/deletefromwatchlist/${auth.currentUser.uid}/${movie.id}`, {
            method: "DELETE",
            mode: 'cors'
        })
        .then(getWatchlist())
        .then(setReload(!reload))
        .then(setModal(`${movie.title} has been removed from your watchlist`))
        .then(openModal())
        .catch(err => console.error("error: " + err))
    }    

    const removeFromWatched = async (movie)=>{
        await fetch(`${process.env.REACT_APP_BACK_URL}/api/deletefromwatched/${auth.currentUser.uid}/${movie.id}`, {
            method: "DELETE",
            mode: 'cors'
        })
        .then(getWatched())
        .then(setReload(!reload))
        .then(setModal(`${movie.title} has been removed from your watched list`))
        .then(openModal())
        .catch(err => console.error("error: " + err))
    }

    const closeModal = () => {
    const modal = document.querySelector('.message-modal-container')
    modal.style.visibility = 'hidden';
}

    const openModal = () => {
    const modal = document.querySelector('.message-modal-container')
    modal.style.visibility = 'visible';
    setTimeout(closeModal, 4000)
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
            setUser,
            closeModal,
            openModal,
            modal
        }}>
        {children}
        </MovieSearchContext.Provider>
    )
}

export default MovieSearchContextProvider