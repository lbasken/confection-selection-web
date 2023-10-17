import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import ServiceClient from "../../ServiceClient.js";
import DatePicker, {DateObject} from "react-multi-date-picker";
import {randomId} from '@mui/x-data-grid-generator';
import FullEditDataGrid from "mui-datagrid-full-edit";

export default function AdminCreateContestPage() {
    // const [chips, setChips] = useState([]);
    //
    // function handleChange(newChips) {
    //   setChips(newChips);
    // }

  const columns = [
    {field: 'entry', headerName: 'Entry', width: 180, editable: true},
    {field: 'name', headerName: 'Name', width: 180, editable: true}
  ];

  const [entries, setEntries] = useState([]);

    useEffect(() => {
        console.log("rows", entries);
    }, [entries]);

    function createRowData(oldRows) {
        return {id: randomId(), entry: "", name: ""};
    }

    function onSaveRow(id, updatedRow, oldRow, oldRows) {
        console.log("onSaveRow", id, updatedRow, oldRow, oldRows);
        setEntries(oldRows.map(row => (row.id === updatedRow.id ? {...updatedRow} : row)));
    }

    function onDeleteRow(id, oldRow, oldRows) {
        console.log("onDeleteRow", id, oldRow, oldRows);
        setEntries(oldRows.filter(row => row.id !== id));
    }

    function onSubmit(contest) {
        console.log("onSubmit", JSON.parse(JSON.stringify(contest)));
        contest.entries = entries;
        contest.start_date = JSON.parse(JSON.stringify(contest.date_range?.[0]));
        contest.end_date = JSON.parse(JSON.stringify(contest.date_range?.[1]));
        delete contest.date_range;
        console.log("onSubmit", JSON.parse(JSON.stringify(contest)));
        ServiceClient.request("/contest", "POST", contest)
          .then(data => console.log(data))
          .catch(error => console.log(error.message));
    }

    return <div>
        <h1>Create New Contest</h1>
        <Formik initialValues={{name: "", description: "", date_range: [new DateObject().subtract(4, "days"), new DateObject().add(4, "days")]}} onSubmit={onSubmit}>
            <Form>
              <Field name="name">{(props) => <TextField required fullWidth type="text" label="Title" {...props.field} />}</Field>
              <Field name="description">{(props) => <TextField required fullWidth type="text" label="Description" {...props.field} />}</Field>
              {/*<Field name="start_date">{(props) => <TextField required fullWidth type="date" label="Contest Start Date" {...props.field} />}</Field>*/}
              {/*<Field name="end_date">{(props) => <TextField required fullWidth type="date" label="Contest End Date" {...props.field} />}</Field>*/}
              {/*<Field name="cookie">{(props) => <MuiChipsInput required size="small" label="Cookies" {...props.field} value={chips} onChange={handleChange} />}</Field>*/}
                <Field name="date_range">{props => <DatePicker range onChange={dates => {
                    console.log("props", props);
                    props.form.setFieldValue("date_range", dates);
                }}/>}</Field>
              {/*<Field name="start_date">{(props) => <DatePicker range {...props.field} />}</Field>*/}
              {/*<Field name="end_date">{(props) => <DatePicker range rangeHover {...props.field} />}</Field>*/}

                <FullEditDataGrid
                    columns={columns}
                    rows={entries}
                    onSaveRow={onSaveRow}
                    onDeleteRow={onDeleteRow}
                    createRowData={createRowData}
                />

              <Button variant="contained" type="submit">Create Contest</Button>
            </Form>
        </Formik>
        <button><Link to="/admin-contests">Cancel</Link></button>
    </div>
}
