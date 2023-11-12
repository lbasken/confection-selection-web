import React, {useEffect} from 'react';
import "./ContestPage.css";
import {useNavigate} from "react-router-dom";
import {useModal} from "mui-modal-provider";
import {useStore} from "@d4lton/node-frontend";
import UserContestsStore from "../../stores/UserContestsStore.js";
import ContestCard from "../../components/ContestCard/ContestCard.jsx";
import ErrorDialog from "../../components/dialogs/ErrorDialog.jsx";

export default function ContestPage() {

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

  return <div className="contest-card">
    {contests?.map(contest => <ContestCard key={`contest_${contest.id}`} contest={contest} clickable />)}
  </div>
}
