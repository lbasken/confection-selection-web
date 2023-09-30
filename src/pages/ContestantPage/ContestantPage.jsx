import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";

const columns = [
    {field: 'id'},
    {field: 'name'},
    {field: 'entry number'},
    {field: 'confection'}
];


export default function ContestantPage() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("https://api-zgnozpscca-uc.a.run.app/contestant")
            .then(response => response.json())
            .then(data => {
                setRows(data);
            })
            .catch(error => console.log(error.message))
    }, [])

    return <DataGrid style={{height: "100%"}} getRowId={(row) =>  row.name } rows={rows} columns={columns} />;
}