import "./CSDataGrid.css";
import React, {useEffect, useState} from "react";
import {DataGrid, GridRowModes} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import CSDataGridToolbar from "./CSDataGridToolbar/CSDataGridToolbar.jsx";
import {randomId} from "@mui/x-data-grid-generator";

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
    const columns = [];
    for (const column of props.columns) { columns.push(column); }
    if (props.getActions) {
      const minWidth = props.actionsMinWidth ?? 40;
      columns.push({field: "actions", type: "actions", headerName: "", minWidth: minWidth, flex: 1, align: "right", getActions: props.getActions});
    }
    setColumns(columns);
  }, [props.columns]);

  function handleRowModesModelChange(newRowModesModel) {
    setRowModesModel(newRowModesModel);
  }

  async function processRowUpdate(updated, original) {
    delete updated.isNew;
    if (props.onChange) { props.onChange(rows.map(row => row.id === updated.id ? updated : row)); }
    return updated;
  }

  function onProcessRowUpdateError(error) {
    console.log("onProcessRowUpdateError", error);
  }

  function onRowClick(params, event, details) {
    if (props.onRowClick) { props.onRowClick(params.row.id); }
  }

  function onAdd() {
    if (props.showAdd) {
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

  const classes = ["cs-data-grid"];
  if (props.autoHeight) {
    classes.push("cs-data-grid-auto-height")
  }

  return <div className={`${classes.join(" ")}`}>
    <DataGrid
      className="table"
      columns={columns ?? []}
      rows={rows ?? []}
      editMode="row"
      disableColumnMenu
      loading={props.loading}
      onRowClick={onRowClick}
      slots={slots}
      slotProps={slotProps}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={onProcessRowUpdateError}
    />
  </div>;

}
