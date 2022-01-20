import React from 'react'
import MovieSearchedContainer from './components/MovieSearchedContainer';
import MovieSearchContextProvider from './context/MovieSearchContext.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import WatchList from './components/WatchList';
import Header from './components/Header';


function App() {
  return (
    <MovieSearchContextProvider>
      <BrowserRouter>
        <div>
          <Header />
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
