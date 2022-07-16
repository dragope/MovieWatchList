import React from 'react'
import { AuthProvider } from 'reactfire';
import { auth } from './firebase/firebase-config.js';
import MovieSearcher from './components/MovieSearcher.jsx';
import MovieSearchContextProvider from './context/MovieSearchContext.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import WatchList from './components/WatchList';
import Header from './components/Header';
import Watched from './components/Watched';
import MovieContainer from './components/MovieContainer.jsx';
import Footer from './components/Footer.jsx';
import Person from './components/Person.jsx';
import Login from './components/Login.js';
import Register from './components/Register.js';
import PrivateRoute from './routing/PrivateRoute.js';

function App() {
  
  return (
    <AuthProvider sdk={auth}>
      <MovieSearchContextProvider>
          <BrowserRouter>
            <div>
              <Header />
                <Routes>
                    <Route
                        exact
                        path="/login"
                        element={ <Login/>}
                      />
                      <Route
                        exact
                        path="/register"
                        element={ <Register/>}
                      />
                      <Route element={<PrivateRoute/>}>
                      <Route
                        exact
                        path={"/"}
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
                      <Route
                        exact
                        path="/person/:personid"
                        element={<Person/>}
                      /> 
                      </Route>
                </Routes>
              <Footer/>
            </div>
          </BrowserRouter>
      </MovieSearchContextProvider>
    </AuthProvider>
  );
}

export default App;
