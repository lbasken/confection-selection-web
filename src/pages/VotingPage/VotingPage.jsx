import React, {useEffect, useState} from "react";
import "./VotingPage.css";
import {useStore} from "@d4lton/node-frontend";
import UserContestsStore from "../../stores/UserContestsStore.js";
import {useParams} from "react-router-dom";
import CategorySelector from "../VotingPage/CategorySelector/CategorySelector.jsx";
import ContestCard from "../../components/ContestCard/ContestCard.jsx";
import {MenuItem} from "@mui/material";

export default function VotingPage() {

  const [contests, contestsStore] = useStore(UserContestsStore);
  const [contest, setContest] = useState();
  const params = useParams();

  const categories = [
    {id: "best_tasting", label: "Best Tasting"},
    {id: "most_festive", label: "Most Festive"},
    {id: "most_creative", label: "Most Creative"}
  ];

  useEffect(() => {
    if (!params.id || !Array.isArray(contests)) { return; }
    setContest(contestsStore.getById(params.id));
  }, [params.id, contests]);

  useEffect(() => {
    console.log("contest", contest);
  }, [contest]);

  function renderCategories() {
    return categories.map(category => <CategorySelector contest={contest} category={category} key={category.id} />);
  }

  if(!contest) {
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
