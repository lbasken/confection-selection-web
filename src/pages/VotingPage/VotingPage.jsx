import React, {useEffect, useState} from "react";
import "./VotingPage.css";
import {useStore} from "@d4lton/node-frontend";
import UserContestsStore from "../../stores/UserContestsStore.js";
import {useParams} from "react-router-dom";
import ContestCard from "../../components/ContestCard/ContestCard.jsx";

export default function VotingPage() {

  const [contests, contestsStore] = useStore(UserContestsStore);
  const [contest, setContest] = useState();
  const params = useParams();

  useEffect(() => {
    if (!params.id || !Array.isArray(contests)) { return; }
    setContest(contestsStore.getById(params.id));
  }, [params.id, contests]);

  useEffect(() => {
    console.log("contest", contest);
  }, [contest]);

  if(!contest) {
    return <div className="voting-page">
      Loading
    </div>
  }

  return <div className="voting-page">
    <ContestCard contest={contest} />
  </div>

}
