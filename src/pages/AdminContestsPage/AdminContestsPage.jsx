import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import "./AdminContestsPage.css";
import {Link} from "react-router-dom";
import ServiceClient from "../../ServiceClient.js";

const columns = [
    {field: 'name'},
  {field: 'description'},
  {field: 'start_date'},
    {field: 'end_date'}
];

export default function AdminContestsPage() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
      ServiceClient.request("/contest")
        .then(data => setRows(data))
        .catch(error => console.log(error.message));
    }, [])

    return <div>
        <h1>All Contests</h1>
        <DataGrid style={{height: "100%"}} getRowId={(row) =>  row.name + row.id } rows={rows} columns={columns} />
        <button><Link to="/admin-create-contests"><AddIcon /></Link></button>
    </div>
}
