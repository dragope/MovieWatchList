import React from 'react'
import MovieSearchedContainer from './components/MovieSearchedContainer';
import MovieSearchContextProvider from './context/MovieSearchContext.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import WatchList from './components/WatchList';


function App() {
  return (
    <MovieSearchContextProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<MovieSearchedContainer/>}
            />
            <Route
              exact
              path="/watchlist"
              element={<WatchList/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </MovieSearchContextProvider> 
  );
}

export default App;
