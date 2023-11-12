import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useStore} from "@d4lton/node-frontend";
import UserContestsStore from "../../stores/UserContestsStore.js";
import CategorySelector from "../VotingPage/CategorySelector/CategorySelector.jsx";
import ContestCard from "../../components/ContestCard/ContestCard.jsx";
import ServiceClient from "../../ServiceClient.js";
import "./VotingPage.css";

export default function VotingPage() {

  const [contests, contestsStore] = useStore(UserContestsStore);
  const [contest, setContest] = useState();
  const [categories, setCategories] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (!params.id || !Array.isArray(contests)) { return; }
    setContest(contestsStore.getById(params.id));
  }, [params.id, contests]);

  useEffect(() => {
    if (!contest) { return; }
    ServiceClient
      .request(`/contest/${contest.id}/categories`)
      .then(categories => setCategories(categories))
      .catch(error => {
        console.log(error.message);
      });
  }, [contest]);

  function renderCategories() {
    return categories?.map(category => <CategorySelector contest={contest} category={category} key={category.id} />);
  }

  if (!contest) {
    return <div className="voting-page">
      Loading
    </div>
  }

  return <div className="voting-page">
    <ContestCard className="contest-card" contest={contest} />
    <div>
      {renderCategories()}
    </div>
  </div>

}
