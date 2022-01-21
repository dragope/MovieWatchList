import { useState, useContext, createContext} from 'react'

const MovieSearchContext = createContext([])

export const useMovieSearchContext = () => useContext(MovieSearchContext)

function MovieSearchContextProvider({children}){

    const [movieSearch, setMovieSearch] = useState([])
    const [error, setError] = useState('')
    const [watchList, setWatchList] = useState([])
    const [watched, setWatched] = useState([])
    const [loadWl, setLoadWl] = useState(false)


    const removeFromWatchList = (movie)=>{
        setLoadWl(true)
        let movieIndex = watchList.findIndex(i => i.id === movie.id)
        movieIndex > -1 &&
            console.log(movieIndex)
            watchList.splice(movieIndex,1)
            setWatchList([...watchList])
        console.log(watchList)
    }

    const addToWatchList = (movie)=>{
        setLoadWl(true)
        let movieIndex = movieSearch.findIndex(i => i.id === movie.id)
        movieIndex > -1 &&
            setWatchList([...watchList, movieSearch[movieIndex]])
        console.log(watchList)
    }

    const addToWatched = (movie)=>{
        setLoadWl(true)
        let movieIndex = movieSearch.findIndex(i => i.id === movie.id)
        movieIndex > -1 &&
            setWatched([...watched, movieSearch[movieIndex]])
        console.log(watched)
    }

    const removeFromWatched = (movie)=>{
        setLoadWl(true)
        let movieIndex = watchList.findIndex(i => i.id === movie.id)
        movieIndex > -1 &&
            console.log(movieIndex)
            watched.splice(movieIndex,1)
            setWatched([...watched])
        console.log(watched)
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
            loadWl, 
            setLoadWl,
            watched,
            setWatched,
            addToWatched,
            removeFromWatched
        }}>
        {children}
        </MovieSearchContext.Provider>
    )
}

export default MovieSearchContextProvider