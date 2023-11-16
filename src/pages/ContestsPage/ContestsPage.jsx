import "../Page.css";
import "./ContestsPage.css";
import ContestCard from "../../components/ContestCard/ContestCard.jsx";
import ErrorDialog from "../../components/dialogs/ErrorDialog.jsx";
import UserContestsStore from "../../stores/UserContestsStore.js";
import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useModal} from "mui-modal-provider";
import {useStore} from "@d4lton/node-frontend";

export default function ContestsPage() {

  const [contests, contestsStore] = useStore(UserContestsStore);
  const {showModal} = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (contestsStore.error) {
      console.log(contestsStore.error.message);
      const dialog = showModal(
        ErrorDialog,
        {
          title: "Error",
          description: "Could not get the list of contests.",
          confirm: "CLOSE",
          onConfirm: () => {
            dialog.hide();
            navigate("/");
          },
        }
      );
    }
  }, [contestsStore.error]);

  return <div className="page">
    {contests?.map(contest => <ContestCard className="contest-card" key={`contest_${contest.id}`} contest={contest} clickable />)}
  </div>
}
