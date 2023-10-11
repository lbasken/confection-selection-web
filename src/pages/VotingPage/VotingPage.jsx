import React from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import "./VotingPage.css";

export default function VotingPage() {

    const onSubmit = (formState, formEvent) => {
        console.log("Form Submitted");
    };

    return <div className="form">
        <Formik initialValues={{email: "", password: ""}} onSubmit={onSubmit}>
            <Form>
                <Field name="email">{(props) => <TextField required fullWidth type="email" label="Email" {...props.field} />}</Field>
                <Field name="password">{(props) => <TextField required fullWidth type="password" label="Password" {...props.field} />}</Field>
                <Field name="when">{(props) => <TextField required fullWidth type="date" label="Date" {...props.field} />}</Field>
                <Button variant="contained" type="submit">SIGN IN</Button>
            </Form>
        </Formik>
    </div>
}