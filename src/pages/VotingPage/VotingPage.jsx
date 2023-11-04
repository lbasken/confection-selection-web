import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@mui/material";
import "./VotingPage.css";
import {useStore} from "@d4lton/node-frontend";
import UserContestsStore from "../../stores/UserContestsStore.js";

export default function VotingPage() {
  const [contests, contestsStore] = useStore(UserContestsStore);

  return <div>
    <h1>Vote Here!</h1>
  </div>
}
