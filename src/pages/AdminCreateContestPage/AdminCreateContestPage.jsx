import React, {useEffect, useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Autocomplete, Button, FormControl, FormGroup, FormLabel, InputLabel, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient.js";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import AutocompleteEditCell from "../../components/CSDataGrid/AutocompleteEditCell/AutocompleteEditCell.jsx";
import "./AdminCreateContestPage.css";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Delete} from "@mui/icons-material";

export default function AdminCreateContestPage() {

  const columns = [
    {field: "entry", headerName: "Entry", width: 180, editable: true},
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
      renderCell: renderEmailCell,
      renderEditCell: renderEmailInputCell
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

  function renderEmailInputCell(params) {
    return <AutocompleteEditCell options={users.map(user => user.email) ?? []} value={params.row.email} id={params.id} field={params.field} forcePopupIcon={false} />;
  }

  function renderEmailCell(params) {
    return <div>{params.row.email}</div>;
  }

  function onDelete(id) {
    onChange(contest.entries.filter(row => row.id !== id));
  }

  function getActions(params) {
    return [<GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => onDelete(params.id)} color="inherit" />];
  }

  function onChange(rows) {
    setContest({...contest, entries: rows});
  }

  async function onSubmit(values) {
    values = JSON.parse(JSON.stringify({...contest, ...values}));
    values.judges = judges ?? [];
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
    description: contest?.description ?? ""
  };

  return <div className="admin-manage-contest-page">
    <div className="admin-manage-contest-page-title">Manage Contest</div>
    <Formik enableReinitialize initialValues={values} onSubmit={onSubmit}>
      {props => {
        return <>
          <Form className="admin-manage-contest-form">
            <Field name="name">{(props) => <TextField required fullWidth type="text" label="Title" {...props.field} />}</Field>
            <Field name="description">{(props) => <TextField required fullWidth type="text" label="Description" {...props.field} />}</Field>
          </Form>
          <div className="admin-manage-contest-page-judges">
            <Autocomplete
              multiple
              id="tags-standard"
              options={users.map(user => user.uid) ?? []}
              getOptionLabel={option => users?.find(user => user.uid === option)?.email ?? option}
              value={judges}
              renderInput={(params) => <TextField {...params} variant="outlined" required label="Judges" placeholder="Judges" />}
              onChange={(event, value) => setJudges(value)}
            />
          </div>
          <div className="admin-manage-contest-page-entries">
            <div style={{margin: "1em"}}>
              <CSDataGrid
                columns={columns}
                rows={contest?.entries ?? []}
                crud
                showAdd
                add="ADD ENTRY"
                onChange={onChange}
                getActions={getActions}
              />
            </div>
          </div>
          <div className="admin-manage-contest-submit-button">
            <Button variant="contained" onClick={() => props.submitForm()}>SAVE</Button>
          </div>
        </>
      }}
    </Formik>
  </div>
}
