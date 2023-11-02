import React, {useEffect, useState} from "react";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import ServiceClient from "../../ServiceClient.js";
import useAuth from "../../hooks/useAuth.js";
import "./UserContestsPage.css";

export default function UserContestsPage() {

  const columns = [
    {field: "name", width: 200},
    {field: "description", width: 300},
    {field: "start_date", width: 150},
    {field: "end_date",  width: 150}
  ];

  const {user, token} = useAuth();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { return; }
    refresh();
  }, [token]);

  async function refresh() {
    try {
      setLoading(true);
      const data = await ServiceClient.request("/contest");
      setRows(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  function onRowClick(id) {
    // TODO: navigate to the voting page for this contest
    // navigate(`/admin-manage-contest/${id}`);
  }

  return <div className="user-contests-page">
    <h2>Contests</h2>
    <CSDataGrid
      rows={rows}
      columns={columns}
      onRowClick={onRowClick}
      loading={loading}
    />
  </div>

}
