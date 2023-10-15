import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import "./AdminContestsPage.css";
import {Link} from "react-router-dom";

const columns = [
    {field: 'name'},
    {field: 'start_date'},
    {field: 'end_date'}
];

export default function AdminContestsPage() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("https://api-zgnozpscca-uc.a.run.app/contests")
            .then(response => response.json())
            .then(data => {
                setRows(data);
            })
            .catch(error => console.log(error.message))
    }, [])

    return <div>
        <h1>All Contests</h1>
        <DataGrid style={{height: "100%"}} getRowId={(row) =>  row.name + row.id } rows={rows} columns={columns} />
        <button><Link to="/admin-create-contests"><AddIcon /></Link></button>
    </div>
}