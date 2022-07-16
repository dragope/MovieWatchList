import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMovieSearchContext } from "../context/MovieSearchContext";

const PrivateRoute = () =>{
  const { user } = useMovieSearchContext()
  return user ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRoute