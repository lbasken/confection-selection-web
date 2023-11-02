import React, {useEffect, useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Autocomplete, Button, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient.js";
import DatePicker, {DateObject} from "react-multi-date-picker";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import AutocompleteEditCell from "../../components/CSDataGrid/AutocompleteEditCell/AutocompleteEditCell.jsx";
import "./AdminCreateContestPage.css";

export default function AdminCreateContestPage() {

  const columns = [
    {field: "entry", headerName: "Entry", width: 180, editable: true},
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
      renderCell: renderOperationsCell,
      renderEditCell: renderOperationsInputCell
    }
  ];

  const abortController = useRef(new AbortController());

  const params = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState();
  const [users, setUsers] = useState([]);
  const [judges, setJudges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) { loadContest(params.id); }
    loadUsers();
  }, [params?.id]);

  async function loadUsers() {
    try {
      const judges = await ServiceClient.request("/user");
      setUsers(judges);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadContest(id) {
    try {
      abortController.current?.abort();
      abortController.current = new AbortController();
      setLoading(true);
      const contest = await ServiceClient.request(`/contest/${id}`, "GET", undefined, abortController.current);
      setContest(contest);
      setJudges(contest.judges ?? []);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function renderOperationsInputCell(params) {
    console.log("renderOperationsInputCell", params);
    return <AutocompleteEditCell options={users.map(user => user.email) ?? []} value={params.row.email} id={params.id} field={params.field} forcePopupIcon={false} />;
  }

  function renderOperationsCell(params) {
    console.log("renderOperationsCell", params);
    return <div>{params.row.email}</div>;
  }

  function onChange(rows) {
    console.log("onChange", rows);
    setContest({...contest, entries: rows});
  }

  async function onSubmit(values) {
    values = JSON.parse(JSON.stringify({...contest, ...values}));
    values.start_date = JSON.parse(JSON.stringify(values.date_range?.[0]));
    values.end_date = JSON.parse(JSON.stringify(values.date_range?.[1]));
    values.judges = judges ?? [];
    delete values.date_range;
    try {
      if (params.id) {
        await ServiceClient.request(`/contest/${params.id}`, "PATCH", values);
      } else {
        await ServiceClient.request("/contest", "POST", values);
      }
      navigate("/admin-contests");
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    name: contest?.name ?? "",
    description: contest?.description ?? "",
    date_range: contest?.start_date ? [new DateObject({date: contest.start_date}), new DateObject({date: contest.end_date})] : []
  };

  return <div className="admin-manage-contest-page">
    <h2>Manage Contest</h2>
    <Formik enableReinitialize initialValues={values} onSubmit={onSubmit}>
      {props => {
        return <>
          <Form className="admin-manage-contest-form">
            <Field name="name">{(props) => <TextField required fullWidth type="text" label="Title" {...props.field} />}</Field>
            <Field name="description">{(props) => <TextField required fullWidth type="text" label="Description" {...props.field} />}</Field>
            <Field name="date_range">
              {props => <DatePicker inputClass="admin-manage-contest-date-range" range value={values.date_range} onChange={dates => {
                props.form.setFieldValue("date_range", dates);
              }} />}
            </Field>
          </Form>
          <Autocomplete
            multiple
            id="tags-standard"
            options={users.map(user => user.uid) ?? []}
            getOptionLabel={option => users?.find(user => user.uid === option)?.email ?? option}
            value={judges}
            renderInput={(params) => <TextField {...params} variant="standard" label="Judges" placeholder="Judges" />}
            onChange={(event, value) => setJudges(value)}
          />
          <CSDataGrid
            columns={columns}
            rows={contest?.entries ?? []}
            crud
            autoAddRow
            add="ADD ENTRY"
            onChange={onChange}
          />
          <div className="admin-manage-contest-submit-button">
            <Button variant="contained" onClick={() => props.submitForm()}>SAVE</Button>
          </div>
        </>
      }}
    </Formik>
  </div>
}
