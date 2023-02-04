import React from "react";
import { HomePage } from "homepage";
import { LoginPage } from "login";
import { RegisterPage } from "register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:username" element={<HomePage/>}/>
        <Route path="*" element={<Navigate to="/home" replace/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

// / --> Index
// /home --> Home page
// /user/youngermax
// /user/azhang81

// 1. Get the username out of url
// 2. If username is specified then use the username to get the tweets
// 3. Load the tweets on homepage
