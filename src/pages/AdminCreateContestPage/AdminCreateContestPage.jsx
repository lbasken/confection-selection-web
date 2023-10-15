import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {MuiChipsInput} from "mui-chips-input";



const onSubmit = (formState, formEvent) => {
    console.log("Form Submitted");
    console.log(formState, formEvent);
};

export default function AdminCreateContestPage() {
    const [chips, setChips] = useState([]);

    const handleChange = (newChips) => {
        setChips(newChips);
    }

    return <div>
        <h1>Create New Contest</h1>
        <Formik initialValues={{title: "", description: "", cookie: "", start_date: 0, end_date: 0}} onSubmit={onSubmit}>
            <Form>
                <Field name="title">{(props) => <TextField required fullWidth type="text" label="Title" {...props.field} />}</Field>
                <Field name="description">{(props) => <TextField required fullWidth type="text" label="Description" {...props.field} />}</Field>
                <Field name="start_date">{(props) => <TextField required fullWidth type="date" label="Contest Start Date" {...props.field} />}</Field>
                <Field name="end_date">{(props) => <TextField required fullWidth type="date" label="Contest End Date" {...props.field} />}</Field>
                <Field name="cookie">{(props) => <MuiChipsInput required size="small" label="Cookies" {...props.field} value={chips} onChange={handleChange} />}</Field>
                <Button variant="contained" type="submit">Create Contest</Button>
            </Form>
        </Formik>
        <button><Link to="/admin-contests">Cancel</Link></button>
    </div>
}