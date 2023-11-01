import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ModalProvider from "mui-modal-provider";
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

  if (user === undefined) { return; } // user being undefined means Firebase is still loading

  if (user === null) { return <SignInPage /> } // user being null means they aren't signed in

  return <ModalProvider>
    <BrowserRouter>
      <BasicAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contestants" element={<ContestantPage />} />
        <Route path="/vote" element={<VotingPage />} />
        {user?.role === "admin" && <Route path="/admin-contests" element={<AdminContestsPage />} />}
        {user?.role === "admin" && <Route path="/admin-manage-contest/:id" element={<AdminCreateContestPage />} />}
        <Route path="/user-contests" element={<UserContestsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </ModalProvider>
}
