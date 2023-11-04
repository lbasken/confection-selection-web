import * as React from 'react';
import {useStore} from "@d4lton/node-frontend";
import UserContestsStore from "../../stores/UserContestsStore.js";
import ContestCard from "../../components/ContestCard/ContestCard.jsx";

export default function ContestPage() {

  const [contests, contestsStore] = useStore(UserContestsStore);

  return <div>
    {contests?.map(contest => <ContestCard key={`contest_${contest.id}`} contest={contest} />)}
  </div>
}
