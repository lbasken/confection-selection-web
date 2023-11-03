import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Autocomplete, Button, TextField} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Delete} from "@mui/icons-material";
import {useStore} from "@d4lton/node-frontend";
import {Field, Form, Formik} from "formik";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import AutocompleteEditCell from "../../components/CSDataGrid/AutocompleteEditCell/AutocompleteEditCell.jsx";
import AdminContestsStore from "../../AdminContestsStore.js";
import UsersStore from "../../UsersStore.js";
import "./AdminCreateContestPage.css";

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

  const params = useParams();
  const navigate = useNavigate();

  const [contests, contestsStore] = useStore(AdminContestsStore);
  const [users, usersStore] = useStore(UsersStore);

  const [contest, setContest] = useState();
  const [judges, setJudges] = useState([]);

  useEffect(() => {
    if (!contests) { return; }
    if (params.id) { loadContest(params.id); }
  }, [params?.id, contests]);

  async function loadContest(id) {
    const contest = contests.find(contest => contest.id === id);
    setContest(contest);
    setJudges(contest?.judges ?? []);
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
        await contestsStore.update(values);
      } else {
        await contestsStore.create(values);
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
              options={users?.map(user => user.uid) ?? []}
              getOptionLabel={option => users?.find(user => user.uid === option)?.email ?? option}
              value={judges}
              renderInput={(params) => <TextField {...params} variant="outlined" required label="Judges" placeholder="Judges" />}
              onChange={(event, value) => setJudges(value)}
            />
          </div>
          <div className="admin-manage-contest-page-entries">
            <div style={{margin: "1em", flexGrow: "1", display: "flex", flexDirection: "column"}}>
              <CSDataGrid
                columns={columns}
                rows={contest?.entries ?? []}
                crud
                showAdd
                autoHeight
                add="ADD ENTRY"
                onChange={onChange}
                getActions={getActions}
              />
            </div>
          </div>
          <div className="admin-manage-contest-submit-button">
            <Button variant="text" onClick={() => navigate("/admin-contests")}>CANCEL</Button>
            <Button variant="contained" onClick={() => props.submitForm()}>SAVE</Button>
          </div>
        </>
      }}
    </Formik>
  </div>
}
