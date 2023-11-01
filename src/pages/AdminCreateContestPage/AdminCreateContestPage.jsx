import React, {useEffect, useRef, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient.js";
import DatePicker, {DateObject} from "react-multi-date-picker";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import "./AdminCreateContestPage.css";

export default function AdminCreateContestPage() {

  const columns = [
    {field: "entry", headerName: "Entry", width: 180, editable: true},
    {field: "name", headerName: "Name", width: 180, editable: true}
  ];

  const abortController = useRef(new AbortController());

  const params = useParams();

  const [contest, setContest] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) { loadContest(params.id); }
  }, [params?.id]);

  async function loadContest(id) {
    try {
      abortController.current?.abort();
      abortController.current = new AbortController();
      setLoading(true);
      const contest = await ServiceClient.request(`/contest/${id}`, "GET", undefined, abortController.current);
      setContest(contest);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function onChange(rows) {
    console.log("onChange", rows);
    setContest({...contest, entries: rows});
  }

  function onSubmit(values) {
    values = JSON.parse(JSON.stringify({...contest, ...values}));
    values.start_date = JSON.parse(JSON.stringify(values.date_range?.[0]));
    values.end_date = JSON.parse(JSON.stringify(values.date_range?.[1]));
    delete values.date_range;
    if (params.id) {
      ServiceClient.request(`/contest/${params.id}`, "PATCH", values)
        .then(data => setContest(data))
        .catch(error => console.log(error.message));
    } else {
      ServiceClient.request("/contest", "POST", values)
        .then(data => setContest(data))
        .catch(error => console.log(error.message));
    }
  }

  const values = {
    name: contest?.name ?? "",
    description: contest?.description ?? "",
    date_range: contest?.start_date ? [new DateObject({date: contest.start_date}), new DateObject({date: contest.end_date})] : []
  };

  return <div className="admin-manage-contest-page">
    <h2>Manage Contest</h2>
    <Formik
      enableReinitialize
      initialValues={values}
      onSubmit={onSubmit}
    >
      {props => {
        return <>
          <Form className="admin-manage-contest-form">
            <Field name="name">{(props) => <TextField required fullWidth type="text" label="Title" {...props.field} />}</Field>
            <Field name="description">{(props) => <TextField required fullWidth type="text" label="Description" {...props.field} />}</Field>
            <Field name="date_range">{props => <DatePicker inputClass="admin-manage-contest-date-range" range value={values.date_range} onChange={dates => {
              props.form.setFieldValue("date_range", dates);
            }} />}</Field>
          </Form>
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
