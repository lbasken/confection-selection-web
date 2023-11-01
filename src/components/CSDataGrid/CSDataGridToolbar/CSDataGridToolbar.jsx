import React from "react";
import {Button} from "@mui/material";
import {GridToolbarContainer} from "@mui/x-data-grid";
import {Add} from "@mui/icons-material";
import "./CSDataGridToolbar.css";

export default function CSDataGridToolbar(props) {

  return <GridToolbarContainer className="cs-data-grid-toolbar">
    <div className="cs-data-grid-toolbar-spacer" />
    <Button className="cs-data-grid-toolbar-button" onClick={props.onClick}><Add /> {props.add ?? "ADD"}</Button>
  </GridToolbarContainer>;

}
