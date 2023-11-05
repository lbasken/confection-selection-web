import React from "react";
import ContestResult from "./ContestResult/ContestResult.jsx";
import "./ContestResults.css";

export default function ContestResults(props) {

  function renderWinners() {
    if (!props.winners) { return <div>Loading...</div>; }
    const category_ids = Object.keys(props.winners);
    return category_ids.map(category_id => {
      const winner = props.winners[category_id];
      return <ContestResult key={`contest_result_${category_id}`} category_id={category_id} winner={winner} />
    });
  }

  return <div className="contest-results">
    {renderWinners()}
  </div>

}
