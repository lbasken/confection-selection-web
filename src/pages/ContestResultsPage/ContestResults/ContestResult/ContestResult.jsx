import React, {useEffect, useState} from "react";
import Utilities from "../../../../Utilities.js";
import "./ContestResult.css";

export default function ContestResult(props) {

  const [winner, setWinner] = useState(props.winner);

  function renderTie() {
    return <div className="contest-result-detail">
      For <span className="contest-result-detail-category">"{Utilities.generateNameForCategoryId(props.category_id)}"</span>, there is a <span>{winner.entrants.length}-way tie</span> between <span className="contest-result-detail-winner">{Utilities.concatenateWithAnd(winner.entrants)}</span>.
    </div>
  }

  function renderWinner() {
    return <div className="contest-result-detail">
      For <span className="contest-result-detail-category">"{Utilities.generateNameForCategoryId(props.category_id)}"</span>, the winner is <span className="contest-result-detail-winner">{winner.entrants[0]}</span>.
    </div>
  }

  function renderNoVotes() {
    return <div className="contest-result-detail">
      For <span className="contest-result-detail-category">"{Utilities.generateNameForCategoryId(props.category_id)}"</span>, there are no votes.
    </div>
  }

  function renderContestDetail() {
    switch (winner.outcome) {
      case "tie": return renderTie();
      case "winner": return renderWinner();
      case "no_votes": return renderNoVotes();
    }
  }

  function renderContestResult() {
    if (!winner) { return; }
    return renderContestDetail();
  }

  return <div className="contest-result">
    {renderContestResult()}
  </div>

}
