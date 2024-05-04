import React, { useEffect } from "react";
import functionHelper from "../utils/functionHelper";
import { Link } from "react-router-dom";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncShowOwnProfile,
  showOwnProfileCreator,
} from "../states/myOwnPtofile/action";
import { asyncShowAllUsers } from "../states/users/action";

const ThreadsItem = ({ threads, likes, dislikes }) => {
  const dispatch = useDispatch();
  const ownProfile = useSelector((state) => state.ownProfile);
  const users = useSelector((state) => state.showAllUsers);

  useEffect(() => {
    dispatch(asyncShowOwnProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncShowAllUsers());
  }, [dispatch]);

  const hasLiked = (thread) => {
    return thread.upVotesBy.includes(ownProfile.id);
  };

  const hasDisliked = (thread) => {
    return thread.downVotesBy.includes(ownProfile.id);
  };

  const getUserInfo = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user || null;
  };

  return (
    <>
      {threads.map((item, index) => (
        <div key={index} className="flex gap-4 flex-col border mt-7 p-5">
          <div className="flex items-center gap-5">
            <Link to={`threads/${item.id}`}>
              <h1 className="font-bold text-lg">{item.title}</h1>
            </Link>
            <p>#{item.category}</p>
          </div>
          <span>
            {functionHelper.stringToHtml(functionHelper.limitedText(item.body))}
            <div className="flex mt-10 items-center gap-5 justify-between">
              <div className="flex gap-5 items-center">
                <div className="flex items-center gap-1 text-lg ">
                  <div
                    onClick={() => likes(item.id)}
                    className="cursor-pointer p-2 hover:bg-slate-200"
                  >
                    {hasLiked(item) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                  </div>
                  <p>{functionHelper.countLength(item.upVotesBy)}</p>
                </div>
                <div className="flex items-center gap-1 text-lg ">
                  <div
                    onClick={() => dislikes(item.id)}
                    className="cursor-pointer p-2 hover:bg-slate-200"
                  >
                    {hasDisliked(item) ? <FaThumbsDown /> : <FaRegThumbsDown />}
                  </div>
                  <p>{functionHelper.countLength(item.downVotesBy)}</p>
                </div>
                <div className="flex items-center gap-1 text-lg ">
                  <div className="cursor-pointer p-2 hover:bg-slate-200">
                    <Link to={`threads/${item.id}`}>
                      <IoChatbubblesOutline />
                    </Link>
                  </div>
                  <p>{item.totalComments}</p>
                </div>
              </div>
              <div className="flex">
                <h1 className="font-bold text-sm">
                  Dibuat Oleh:{" "}
                  {getUserInfo(item.ownerId) ? (
                    <>
                      {getUserInfo(item.ownerId).name} <br />
                      {getUserInfo(item.ownerId).email}
                    </>
                  ) : (
                    "User not found"
                  )}
                </h1>
              </div>
            </div>
          </span>
        </div>
      ))}
    </>
  );
};

ThreadsItem.propTypes = {
  threads: PropTypes.array.isRequired,
  likes: PropTypes.func.isRequired,
  dislikes: PropTypes.func.isRequired,
};

export default ThreadsItem;
