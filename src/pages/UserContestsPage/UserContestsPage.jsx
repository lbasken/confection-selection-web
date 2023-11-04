import React from "react";
import {useStore} from "@d4lton/node-frontend";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import UserContestsStore from "../../stores/UserContestsStore.js";
import "./UserContestsPage.css";

export default function UserContestsPage() {

  const columns = [
    {field: "name", width: 200},
    {field: "description", width: 300}
  ];

  const [contests, contestsStore] = useStore(UserContestsStore);

  function onRowClick(id) {
    // TODO: navigate to the voting page for this contest
    // navigate(`/admin-manage-contest/${id}`);
  }

  return <div className="user-contests-page">
    <div className="user-contests-page-title">Contests</div>
    <CSDataGrid
      rows={contests}
      columns={columns}
      onRowClick={onRowClick}
      loading={contestsStore.loading}
    />
  </div>

}
