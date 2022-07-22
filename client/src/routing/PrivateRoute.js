import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

const PrivateRoute = () =>{

  return auth.currentUser ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRoute