import "../Page.css";
import "./HomePage.css";
import MenuCard from "../../components/MenuCard/MenuCard.jsx";
import useAuth from "../../hooks/useAuth.js";
import React from "react";

export default function HomePage() {

  const {user} = useAuth();

  function renderAdminCards() {
    if (user?.role !== "admin") { return; }
    return <>
      <MenuCard title="Manage Contests" body="Manage all existing contests" route="/admin-contests" />
      <MenuCard title="Invite User" body="Send email invitation to a new user" route="/invite-user" />
    </>;
  }

  return <div className="home-page page">
    <MenuCard title="Hall of Fame" body="View past winners" route="/hall-of-fame" />
    <MenuCard title="Contests" body="View my active contests" route="/contests" />
    {renderAdminCards()}
  </div>
}
