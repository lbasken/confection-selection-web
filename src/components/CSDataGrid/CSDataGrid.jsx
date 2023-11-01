import React, {useEffect, useState} from "react";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {Delete} from "@mui/icons-material";
import {LinearProgress} from "@mui/material";
import CSDataGridToolbar from "./CSDataGridToolbar/CSDataGridToolbar.jsx";
import "./CSDataGrid.css";

export default function CSDataGrid(props) {

  const [columns, setColumns] = useState(props.columns ?? []);

  useEffect(() => {
    if (!props.columns) { return; }
    const columns = JSON.parse(JSON.stringify(props.columns));
    if (props.crud) {
      columns.push({
        field: "actions",
        type: "actions",
        headerName: "",
        width: 50,
        getActions: ({id}) => {
          return [<GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => onDelete(id)} color="inherit" />];
        }
      });
    }
    setColumns(columns);
  }, [props.columns, props.crud]);

  function onDelete(id) {
    if (props.onDelete) { props.onDelete(id); }
  }

  function onRowClick(params, event, details) {
    if (props.onRowClick) { props.onRowClick(params.row.id); }
  }

  const slots = {loadingOverlay: LinearProgress};
  const slotProps = {};
  if (props.crud) {
    slots.toolbar = CSDataGridToolbar;
    slotProps.toolbar = {onClick: props.onAdd, add: props.add};
  }

  return <div className="cs-data-grid">
    <DataGrid
      columns={columns ?? []}
      rows={props.rows ?? []}
      editMode="row"
      disableColumnMenu
      loading={props.loading}
      onRowClick={onRowClick}
      slots={slots}
      slotProps={slotProps}
    />
  </div>;

}
