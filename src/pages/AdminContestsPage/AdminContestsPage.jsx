import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Delete, HowToVote, ToggleOff, ToggleOn, Visibility, VisibilityOff} from "@mui/icons-material";
import {useModal} from "mui-modal-provider";
import ServiceClient from "../../ServiceClient.js";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import useAuth from "../../hooks/useAuth.js";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog/ConfirmationDialog.jsx";
import "./AdminContestsPage.css";

const columns = [
  {field: "name", width: 200},
  {field: "description", width: 300}
];

export default function AdminContestsPage() {

  const {user, token} = useAuth();
  const {showModal, hideModal} = useModal();
  const navigate = useNavigate();
  const rowsRef = useRef();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState();

  rowsRef.current = rows;

  useEffect(() => {
    refresh();
  }, []);

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
    try {
      setLoading(true);
      await ServiceClient.request(`/contest/${id}`, "DELETE");
      refresh();
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }

  function onDelete(id) {
    const contest = rows.find(row => row.id === id);
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

  async function onEnable(id) {
    const contest = rowsRef.current.find(row => row.id === id);
    if (!contest) { return; }
    contest.enabled = !contest.enabled;
    try {
      setLoading(true);
      await ServiceClient.request(`/contest/${id}`, "PATCH", contest);
      refresh();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onVisible(id) {
    const contest = rowsRef.current.find(row => row.id === id);
    if (!contest) { return; }
    contest.visible = !contest.visible;
    try {
      setLoading(true);
      await ServiceClient.request(`/contest/${id}`, "PATCH", contest);
      refresh();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  function onAdd() {
    navigate("/admin-manage-contest");
  }

  function onRowClick(id) {
    navigate(`/admin-manage-contest/${id}`);
  }

  function getActions(params) {
    return [
      <GridActionsCellItem icon={params.row.visible ? <Visibility /> : <VisibilityOff />} label="Visible" onClick={() => onVisible(params.id)} color="inherit" />,
      <GridActionsCellItem icon={params.row.enabled ? <HowToVote /> : <HowToVote style={{color: "#707070"}} />} label="Enable" onClick={() => onEnable(params.id)} color="inherit" />,
      <GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => onDelete(params.id)} color="inherit" />
    ];
  }

  return <div className="admin-contests-page">
    <h2>Manage Contests</h2>
    <CSDataGrid
      rows={rows}
      columns={columns}
      crud
      add="ADD CONTEST"
      onAdd={onAdd}
      onRowClick={onRowClick}
      onDelete={onDelete}
      loading={loading}
      getActions={getActions}
    />
  </div>;

}
