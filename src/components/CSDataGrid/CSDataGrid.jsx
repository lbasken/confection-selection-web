import React, {useEffect, useState} from "react";
import {DataGrid, GridActionsCellItem, GridRowModes} from "@mui/x-data-grid";
import {Delete} from "@mui/icons-material";
import {LinearProgress} from "@mui/material";
import CSDataGridToolbar from "./CSDataGridToolbar/CSDataGridToolbar.jsx";
import {randomId} from "@mui/x-data-grid-generator";
import "./CSDataGrid.css";

export default function CSDataGrid(props) {

  const [columns, setColumns] = useState(props.columns ?? []);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    if (!props.rows) { return; }
    setRows(props.rows);
  }, [props.rows]);

  useEffect(() => {
    if (!props.columns) { return; }
    const columns = JSON.parse(JSON.stringify(props.columns));
    if (props.crud) {
      columns.push({
        field: "actions",
        type: "actions",
        headerName: "",
        flex: 1,
        align: "right",
        getActions: ({id}) => {
          return [<GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => onDelete(id)} color="inherit" />];
        }
      });
    }
    setColumns(columns);
  }, [props.columns, props.crud]);

  function handleRowModesModelChange(newRowModesModel) {
    setRowModesModel(newRowModesModel);
  }

  async function processRowUpdate(updated, original) {
    if (props.onChange) { props.onChange(rows.map(row => row.id === updated.id ? updated : row)); }
    return updated;
  }

  function onProcessRowUpdateError(error) {
    console.log("onProcessRowUpdateError", error);
  }

  function onDelete(id) {
    if (props.autoAddRow) {
      if (props.onChange) { props.onChange(rows.filter(row => row.id !== id)); }
    } else {
      if (props.onDelete) { props.onDelete(id); }
    }
  }

  function onRowClick(params, event, details) {
    if (props.onRowClick) { props.onRowClick(params.row.id); }
  }

  function onAdd() {
    if (props.autoAddRow) {
      const id = randomId();
      setRows((oldRows) => [...oldRows, {id, isNew: true}]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: {mode: GridRowModes.Edit, fieldToFocus: props.columns?.[0]?.field}
      }));
    } else {
      if (props.onAdd) { props.onAdd(); }
    }
  }

  const slots = {loadingOverlay: LinearProgress};
  const slotProps = {};
  if (props.crud) {
    slots.toolbar = CSDataGridToolbar;
    slotProps.toolbar = {onClick: onAdd, add: props.add};
  }

  return <div className="cs-data-grid">
    <DataGrid
      columns={columns ?? []}
      rows={rows ?? []}
      editMode="row"
      disableColumnMenu
      loading={props.loading}
      onRowClick={onRowClick}
      slots={slots}
      autoHeight
      slotProps={slotProps}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={onProcessRowUpdateError}
    />
  </div>;

}
