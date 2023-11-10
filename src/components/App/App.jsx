import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ModalProvider from "mui-modal-provider";
import useAuth from "../../hooks/useAuth.js";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import SignInPage from "../../pages/SignInPage/SignInPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import VotingPage from "../../pages/VotingPage/VotingPage.jsx";
import AdminContestsPage from "../../pages/AdminContestsPage/AdminContestsPage.jsx";
import AdminCreateContestPage from "../../pages/AdminCreateContestPage/AdminCreateContestPage.jsx";
import UserContestsPage from "../../pages/UserContestsPage/UserContestsPage.jsx";
import ContestPage from "../../pages/ContestPage/ContestPage.jsx";
import BasicAppBar from "./BasicAppBar/BasicAppBar.jsx";
import './App.css'
import ContestResultsPage from "../../pages/ContestResultsPage/ContestResultsPage.jsx";
import InviteUserPage from "../../pages/InviteUserPage/InviteUserPage.jsx";
import SignUpPage from "../../pages/SignUpPage/SignUpPage.jsx";

export default function App() {

  const {user} = useAuth();

  if (user === undefined) { return; } // user being undefined means Firebase is still loading

  function renderSignedOutRoutes() {
    return <>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  }

  function renderSignedInRoutes() {
    return <>
      <Route path="/" element={<HomePage />} />
      <Route path="/vote/:id" element={<VotingPage />} />
      {user?.role === "admin" && <Route path="/admin-contests" element={<AdminContestsPage />} />}
      {user?.role === "admin" && <Route path="/admin-manage-contest/:id?" element={<AdminCreateContestPage />} />}
      {user?.role === "admin" && <Route path="/contest-results/:id?" element={<ContestResultsPage />} />}
      {user?.role === "admin" && <Route path="/invite-user" element={<InviteUserPage />} />}
      <Route path="/user-contests" element={<UserContestsPage />} />
      <Route path="/contests" element={<ContestPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>;
  }

  function renderRoutes() {
    if (user === null) { return renderSignedOutRoutes(); }
    return renderSignedInRoutes();
  }

  return <ModalProvider>
    <BrowserRouter>
      <BasicAppBar />
      <Routes>
        {renderRoutes()}
      </Routes>
    </BrowserRouter>
  </ModalProvider>

}
