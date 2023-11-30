import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Homepage from "./Homepage"
import SignIn from "./SignIn";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SpotifyProfile from "./SpoifyProfile";
import UserProfile from "./UserProfile";


function App() {

  const baseUrl = "http://localhost:8000";

  return (
   <BrowserRouter>
        <AuthProvider baseUrl={baseUrl}>
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route exact path="/signin" element={<SignIn />}></Route>
            <Route exact path="/spotify/profile" element={<SpotifyProfile />}></Route>
            <Route exact path="/user/profile" element={<UserProfile />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>

  );
}

export default App;
