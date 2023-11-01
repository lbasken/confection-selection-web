import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useModal} from "mui-modal-provider";
import ServiceClient from "../../ServiceClient.js";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import useAuth from "../../hooks/useAuth.js";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog/ConfirmationDialog.jsx";
import "./AdminContestsPage.css";

const columns = [
  {field: "name", width: 200},
  {field: "description", width: 300},
  {field: "start_date", width: 150},
  {field: "end_date",  width: 150}
];

export default function AdminContestsPage() {

  const {user, token} = useAuth();
  const {showModal, hideModal} = useModal();
  const navigate = useNavigate();

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

  async function deleteContest(id) {
    console.log("deleteContest", id);
    try {
      setLoading(true);
      const contest = await ServiceClient.request(`/contest/${id}`, "DELETE");
      refresh();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  function onDelete(id) {
    const contest = rows.find(row => row.id === id);
    console.log(contest);
    const dialog = showModal(
      ConfirmationDialog,
      {
        title: `Delete${contest?.name ? ` "${contest.name}?"` : " Contest?"}`,
        description: `Are you sure you want to delete this contest?`,
        confirm: "DELETE",
        onConfirm: () => {
          dialog.hide();
          deleteContest(id);
        },
        onCancel: () => dialog.hide()
      }
    );
  }

  function onAdd() {
    navigate("/admin-manage-contest");
  }

  function onRowClick(id) {
    navigate(`/admin-manage-contest/${id}`);
  }

  return <div className="admin-contests-page">
    <h2>Contests</h2>
    <CSDataGrid
      rows={rows}
      columns={columns}
      crud
      add="ADD CONTEST"
      onAdd={onAdd}
      onRowClick={onRowClick}
      onDelete={onDelete}
      loading={loading}
    />
  </div>;

}
