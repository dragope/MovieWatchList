import { useState, useContext, createContext} from 'react'

const MovieSearchContext = createContext([])

export const useMovieSearchContext = () => useContext(MovieSearchContext)

function MovieSearchContextProvider({children}){

    const [movieSearch, setMovieSearch] = useState([])
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)
    const [watchList, setWatchList] = useState([])
    const [loadWl, setLoadWl] = useState(false)

    const reset = () => {
      setLoad(true)
      setMovieSearch([])
      setError('')
    }

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

    const searchMovie = async() =>{
        setLoadWl(true)
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
    }

    return(
        <MovieSearchContext.Provider value={{
            searchMovie,
            addToWatchList,
            removeFromWatchList,
            reset,
            movieSearch, 
            setMovieSearch,
            error, 
            setError, 
            load, 
            setLoad, 
            watchList,
            setWatchList,
            loadWl, 
            setLoadWl
        }}>
        {children}
        </MovieSearchContext.Provider>
    )
}

export default MovieSearchContextProvider