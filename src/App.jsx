import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "./hooks/useAuth.js";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import BasicAppBar from "./BasicAppBar.jsx";
import './App.css'

export default function App() {

    const {user} = useAuth();

    if(!user) {
        return <SignInPage />
    }

    return <BrowserRouter>
        <BasicAppBar />
        <Routes>
            <Route path="/" element={<HomePage />}/>
        </Routes>
    </BrowserRouter>
}
