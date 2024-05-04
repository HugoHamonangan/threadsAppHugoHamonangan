import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaderboardItem from "../components/LeaderboardItem";
import { asyncShowLeaderboard } from "../states/leaderboard/action";

const LeaderboardPage = () => {
  const leaderboard = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncShowLeaderboard());
  }, [dispatch]);

  return (
    <>
      <div className="md:ml-[8rem] p-5">
        <div className="mb-[4rem] bg-b container mx-auto">
          <h1 className="font-bold text-3xl">Leaderboard</h1>
          <LeaderboardItem leaderboard={leaderboard} />
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
