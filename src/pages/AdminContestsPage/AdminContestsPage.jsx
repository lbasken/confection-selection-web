import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Ballot, Delete, HowToVote, Visibility, VisibilityOff} from "@mui/icons-material";
import {useModal} from "mui-modal-provider";
import {useStore} from "@d4lton/node-frontend";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog.jsx";
import AdminContestsStore from "../../stores/AdminContestsStore.js";
import "./AdminContestsPage.css";

const columns = [
  {field: "name", width: 200},
  {field: "description", width: 200}
];

export default function AdminContestsPage() {

  const {showModal} = useModal();
  const navigate = useNavigate();
  const rowsRef = useRef();

  const [contests, contestsStore] = useStore(AdminContestsStore);

  const [rows, setRows] = useState([]);

  rowsRef.current = rows;

  useEffect(() => {
    setRows(contests ?? []);
  }, [contests]);

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
          contestsStore.deleteById(id);
        },
        onCancel: () => dialog.hide()
      }
    );
  }

  async function onEnable(id) {
    const contest = rowsRef.current.find(row => row.id === id);
    if (!contest) { return; }
    contest.enabled = !contest.enabled;
    contestsStore.update(contest);
  }

  async function onVisible(id) {
    const contest = rowsRef.current.find(row => row.id === id);
    if (!contest) { return; }
    contest.visible = !contest.visible;
    contestsStore.update(contest);
  }

  function onResults(id) {
    navigate(`/contest-results/${id}`);
  }

  function onAdd() {
    navigate("/admin-manage-contest");
  }

  function onRowClick(id) {
    navigate(`/admin-manage-contest/${id}`);
  }

  function getActions(params) {
    return [
      <GridActionsCellItem icon={<Ballot />} label="Results" onClick={() => onResults(params.id)} color="inherit" />,
      <GridActionsCellItem icon={params.row.visible ? <Visibility /> : <VisibilityOff style={{color: "#707070"}} />} label="Visible" onClick={() => onVisible(params.id)} color="inherit" />,
      <GridActionsCellItem icon={params.row.enabled ? <HowToVote /> : <HowToVote style={{color: "#707070"}} />} label="Enable" onClick={() => onEnable(params.id)} color="inherit" />,
      <GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => onDelete(params.id)} color="inherit" />
    ];
  }

  return <div className="admin-contests-page">
    <div className="admin-contests-page-title">Manage Contests</div>
    <CSDataGrid
      autoHeight
      rows={rows}
      columns={columns}
      crud
      add="ADD CONTEST"
      onAdd={onAdd}
      onRowClick={onRowClick}
      onDelete={onDelete}
      loading={contestsStore.loading}
      actionsMinWidth={160}
      getActions={getActions}
    />
  </div>;

}
