import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import SignIn from "./SignIn";
import Logout from "./Logout";

import SignupForm from "./SignupForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SpotifyProfile from "./SpotifyProfile";

function App() {
  const baseUrl = "http://localhost:8000";

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={baseUrl}>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/signup" element={<SignupForm />}></Route>
          <Route exact path="/spotify/profile" element={<SpotifyProfile />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
