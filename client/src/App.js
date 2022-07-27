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
import UserMenu from './components/UserMenu.js';
import {PrivateRoute} from './routing/PrivateRoute.js';
import './App.css'
import UserProfile from './components/UserProfile.js';
import MessageModal from './components/MessageModal.js';

function App() {
  
  return (
    <AuthProvider sdk={auth}>
      <MovieSearchContextProvider>
          <BrowserRouter>
            <div className='app'>
              <MessageModal/>
              <Header />
              <div className='bottom-1'>
              <UserMenu />
              <div className='bottom-2'>
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
                      <Route
                        exact
                        path="/user"
                        element={<UserProfile/>}
                      /> 
                      </Route>
                </Routes>
                </div>
                </div>
              <Footer/>
            </div>
          </BrowserRouter>
      </MovieSearchContextProvider>
    </AuthProvider>
  );
}

export default App;
