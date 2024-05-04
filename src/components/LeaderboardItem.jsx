import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { asyncShowOwnProfile } from "../states/myOwnPtofile/action";
import { useDispatch, useSelector } from "react-redux";

const LeaderboardItem = ({ leaderboard }) => {
  const ownProfile = useSelector((state) => state.ownProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncShowOwnProfile());
  }, [dispatch]);

  const isOwnProfile = (user) => {
    return ownProfile && user && ownProfile.email === user.email;
  };

  const getStyle = (index) => {
    if (index === 0) {
      return "bg-amber-300 ";
    } else if (index === 1) {
      return "bg-slate-300";
    } else if (index === 2) {
      return "bg-orange-700 text-white";
    } else {
      return "bg-none";
    }
  };

  return (
    <>
      {leaderboard.map((item, index) => (
        <div key={index} className="flex justify-between mt-9">
          <div className="flex gap-7 items-center">
            <h1 className={`px-3 py-2 border border-dotted ${getStyle(index)}`}>
              {index + 1}
            </h1>
            <img
              src={item.user.avatar}
              alt={`imageAvatar${index}`}
              className="w-[3rem]"
            />
            <div className="flex flex-col">
              <p
                className={`font-bold text-lg ${
                  isOwnProfile(item.user) ? "text-green-600" : ""
                }`}
              >
                {isOwnProfile(item.user)
                  ? `${item.user.name} (you)`
                  : item.user.name}
              </p>
              <p>{item.user.email}</p>
            </div>
          </div>
          <p className="font-bold text-2xl">{item.score}</p>
        </div>
      ))}
    </>
  );
};

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.array.isRequired,
};

export default LeaderboardItem;
