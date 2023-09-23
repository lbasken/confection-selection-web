import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import BasicAppBar from "./BasicAppBar.jsx";
import './App.css'

export default function App() {
    return <BrowserRouter>
        <BasicAppBar />
        <Routes>
            <Route path="/" element={<HomePage />}/>
        </Routes>
    </BrowserRouter>
}
