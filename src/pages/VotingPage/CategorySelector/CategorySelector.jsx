import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useStore} from "@d4lton/node-frontend";
import UsersStore from "../../../stores/UsersStore.js";
import UserContestsStore from "../../../stores/UserContestsStore.js";
import "./CategorySelector.css";

export default function CategorySelector({contest, category}) {

  const [users] = useStore(UsersStore);
  const [contests, contestsStore] = useStore(UserContestsStore);

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!contest?.entries.length || !category || !users.length) { return; }
    setOptions(contest.entries.map(entry => ({id: entry.id, label: entry.entry})));
    const votes = contest.votes?.[category.id];
    if (!votes) { return; }
    setValue(votes.id);
  }, [contest, category, users]);

  useEffect(() => {
    if (!contest || !category || !value) { return; }
    if (contest.votes?.[category.id]?.id === value) { return; }
    const entry = contest.entries.find(entry => entry.id === value);
    if (!entry) { return; }
    contest.votes[category.id] = entry;
    contestsStore.vote(contest, contest.votes);
  }, [contest, category, value]);

  function renderOptions() {
    return options.map(option => <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>);
  }

  return <div className="category-selector">
    <FormControl fullWidth disabled={contestsStore.loading}>
      <InputLabel>{category?.label}</InputLabel>
      <Select value={value} label={category?.label} onChange={event => setValue(event.target.value)}>{renderOptions()}</Select>
    </FormControl>
  </div>

}
