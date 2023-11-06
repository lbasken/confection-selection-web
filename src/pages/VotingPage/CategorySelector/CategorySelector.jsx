import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useStore} from "@d4lton/node-frontend";
import UsersStore from "../../../stores/UsersStore.js";
import UserContestsStore from "../../../stores/UserContestsStore.js";
import "./CategorySelector.css";

export default function CategorySelector(props) {

  const [users] = useStore(UsersStore);
  const [contests, contestsStore] = useStore(UserContestsStore);

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!props.contest?.entries.length || !users.length) { return; }
    setOptions(props.contest.entries.map(entry => ({id: entry.id, label: entry.entry})));
    setValue(props.contest.votes[props.category.id].id);
  }, [props.contest, props.contest, users]);

  useEffect(() => {
    if (!props.contest || !props.category || !value) { return; }
    if (props.contest.votes[props.category.id].id === value) { return; }
    const entry = props.contest.entries.find(entry => entry.id === value);
    if (!entry) { return; }
    props.contest.votes[props.category.id] = entry;
    contestsStore.vote(props.contest, props.contest.votes);
  }, [props.contest, props.category, value]);

  function renderOptions() {
    return options.map(option => <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>);
  }

  return <div className="category-selector">
    <FormControl fullWidth>
      <InputLabel>{props.category?.label}</InputLabel>
      <Select value={value} label={props.category?.label} onChange={event => setValue(event.target.value)}>{renderOptions()}</Select>
    </FormControl>
  </div>

}
