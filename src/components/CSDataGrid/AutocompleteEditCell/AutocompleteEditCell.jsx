/**
 * Copyright ©2023 Drivepoint
 */

import React from "react";
import {Autocomplete, TextField} from "@mui/material";
import {useGridApiContext} from "@mui/x-data-grid-premium";
import "./AutocompleteEditCell.css";

export default function AutocompleteEditCell(props) {

  const apiRef = useGridApiContext();

  function onChange(event, value) {
    const {id, field} = props;
    apiRef.current.setEditCellValue({id, field, value});
  }

  return <Autocomplete
    className="autocomplete-edit-cell"
    renderInput={(params) => <TextField {...params} label="" />}
    size="small"
    disableListWrap
    onChange={onChange}
    {...props}
  />;

}
