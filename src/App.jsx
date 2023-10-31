import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useAuth from "./hooks/useAuth.js";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ContestantPage from "./pages/ContestantPage/ContestantPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import VotingPage from "./pages/VotingPage/VotingPage.jsx";
import AdminContestsPage from "./pages/AdminContestsPage/AdminContestsPage.jsx";
import AdminCreateContestPage from "./pages/AdminCreateContestPage/AdminCreateContestPage.jsx";
import UserContestsPage from "./pages/UserContestsPage/UserContestsPage.jsx";
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
            <Route path="/admin-contests" element={<AdminContestsPage />}/>
            <Route path="/admin-create-contests" element={<AdminCreateContestPage />}/>
            <Route path="/user-contests" element={<UserContestsPage />}/>
            <Route path="*" element={<NotFoundPage />}/>

        </Routes>
    </BrowserRouter>
}
