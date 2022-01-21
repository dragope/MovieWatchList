import React from 'react'
import MovieSearcher from './components/MovieSearcher.jsx';
import MovieSearchContextProvider from './context/MovieSearchContext.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import WatchList from './components/WatchList';
import Header from './components/Header';
import Watched from './components/Watched';
import MovieContainer from './components/MovieContainer.jsx';


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
              element={<MovieSearcher/>}
            />
            <Route
              exact
              path="/watchlist"
              element={<WatchList/>}
            />
            <Route
              exact
              path="/watched"
              element={<Watched/>}
            />
            <Route
              exact
              path="/movie/:movieid"
              element={<MovieContainer/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </MovieSearchContextProvider> 
  );
}

export default App;
