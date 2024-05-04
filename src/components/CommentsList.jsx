import React, { useEffect } from "react";
import functionHelper from "../utils/functionHelper";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDislikeThreadComment,
  asyncLikeThreadComment,
} from "../states/likeThreadsComment/action";

import { asyncShowDetailThreads } from "../states/detailThreads/action";
import { asyncShowOwnProfile } from "../states/myOwnPtofile/action";
import PropTypes from "prop-types";

const CommentsList = ({ threadDetails }) => {
  const dispatch = useDispatch();
  const ownProfile = useSelector((state) => state.ownProfile);
  const extractText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.innerText;
  };

  useEffect(() => {
    dispatch(asyncShowOwnProfile());
  }, [dispatch]);

  const likeComment = async (commentId) => {
    await dispatch(asyncLikeThreadComment(threadDetails.id, commentId));
    dispatch(asyncShowDetailThreads({ threadId: threadDetails.id }));
  };

  const dislikeComment = async (commentId) => {
    await dispatch(asyncDislikeThreadComment(threadDetails.id, commentId));
    dispatch(asyncShowDetailThreads({ threadId: threadDetails.id }));
  };

  const hasLiked = (comment) => {
    return comment.upVotesBy.includes(ownProfile.id);
  };

  const hasDisliked = (comment) => {
    return comment.downVotesBy.includes(ownProfile.id);
  };

  return (
    <div className="mt-9">
      <h1 className="font-bold text-2xl">
        Komentar ({threadDetails.comments ? threadDetails.comments.length : 0})
      </h1>
      {threadDetails.comments &&
        threadDetails.comments.map((item, index) => (
          <div key={index}>
            <div className="flex flex-col gap-7 border-b-2 pb-5">
              <span className="mt-9">
                {functionHelper.stringToHtml(extractText(item.content))}
              </span>
              <p className="font-bold">
                {functionHelper.formatTimeAgo(item.createdAt)}
              </p>
              <div className="flex gap-7 justify-between">
                <div className="flex gap-5">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => likeComment(item.id)}
                      className="p-2"
                    >
                      {hasLiked(item) ? <FaThumbsUp /> : <FaRegThumbsUp />}
                    </button>
                    <p>{item.upVotesBy ? item.upVotesBy.length : 0}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => dislikeComment(item.id)}
                      className="p-2"
                    >
                      {hasDisliked(item) ? (
                        <FaThumbsDown />
                      ) : (
                        <FaRegThumbsDown />
                      )}
                    </button>
                    <p>{item.downVotesBy ? item.downVotesBy.length : 0}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <img className="w-[2rem]" src={item.owner.avatar} alt="" />
                  <p>{item.owner.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

CommentsList.propTypes = {
  threadDetails: PropTypes.any,
};

export default CommentsList;
