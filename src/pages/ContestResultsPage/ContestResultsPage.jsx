import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {randomId} from "@mui/x-data-grid-generator";
import {useStore} from "@d4lton/node-frontend";
import AdminContestsStore from "../../stores/AdminContestsStore.js";
import ServiceClient from "../../ServiceClient.js";
import CSDataGrid from "../../components/CSDataGrid/CSDataGrid.jsx";
import ContestResults from "./ContestResults/ContestResults.jsx";
import Utilities from "../../Utilities.js";
import "./ContestResultsPage.css";

export default function ContestResultsPage() {

  const params = useParams();
  const [contests, contestsStore] = useStore(AdminContestsStore);
  const [contest, setContest] = useState();
  const [results, setResults] = useState();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [winners, setWinners] = useState();

  useEffect(() => {
    if (!params.id || !Array.isArray(contests)) { return; }
    setContest(contestsStore.getById(params.id));
  }, [params, contests]);

  useEffect(() => {
    if (!contest) { return; }
    ServiceClient
      .request(`/contest/${contest.id}/result`, "GET")
      .then(results => setResults(results))
      .catch(error => console.log(error.message));
  }, [contest]);

  useEffect(() => {
    if (!results) { return; }
    setColumns(results.columns.map(id => ({field: id, headerName: Utilities.generateNameForCategoryId(id), type: id === "name" ? "string" : "number", width: 150, valueGetter: cellRenderer})));
    setRows(results.rows.map(row => ({id: randomId(), ...row})));
    setWinners(results.winners);
  }, [results]);

  function cellRenderer(params) {
    const value = params.row[params.field];
    if (typeof value !== "object") { return value; }
    return value.count;
  }

  return <div className="contest-results-page">
    <div className="contest-results-page-title">{contest ? `Results for ${contest.name}` : "Loading..."}</div>
    <ContestResults winners={winners} />
    <CSDataGrid
      autoHeight
      rows={rows}
      columns={columns}
      loading={contestsStore.loading}
    />
  </div>

}
