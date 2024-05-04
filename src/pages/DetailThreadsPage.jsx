import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asyncShowDetailThreads } from '../states/detailThreads/action';
import functionHelper from '../utils/functionHelper';
import {
  asyncLikeThread,
  asyncDislikeThread,
} from '../states/likeThreads/action';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa6';
import { IoChatbubblesOutline } from 'react-icons/io5';
import {
  asyncShowOwnProfile,
  showOwnProfileCreator,
} from '../states/myOwnPtofile/action';
import { asyncShowAllUsers } from '../states/users/action';
import Comments from '../components/Comments';
import CommentsList from '../components/CommentsList';
import { asyncAddComments } from '../states/comments/action';

const DetailThreadsPage = () => {
  const { id } = useParams();
  const threadDetails = useSelector((state) => state.detailThreads);
  const accessToken = localStorage.getItem('accessToken');
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const ownProfile = useSelector((state) => state.ownProfile);
  const users = useSelector((state) => state.showAllUsers);

  useEffect(() => {
    dispatch(asyncShowOwnProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncShowAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncShowDetailThreads({ threadId: id }));
  }, [dispatch, id]);

  const addLikes = async (id) => {
    try {
      await dispatch(asyncLikeThread({ threadId: id }));
      dispatch(asyncShowDetailThreads({ threadId: id }));
    } catch (error) {
      alert(error.message);
    }
  };

  const dislikes = async (id) => {
    try {
      await dispatch(asyncDislikeThread({ threadId: id }));
      dispatch(asyncShowDetailThreads({ threadId: id }));
    } catch (error) {
      alert(error.message);
    }
  };

  const hasLiked = () => {
    return (
      ownProfile &&
      ownProfile.id &&
      threadDetails.upVotesBy &&
      threadDetails.upVotesBy.includes(ownProfile.id)
    );
  };

  const hasDisliked = () => {
    return (
      ownProfile &&
      ownProfile.id &&
      threadDetails.downVotesBy &&
      threadDetails.downVotesBy.includes(ownProfile.id)
    );
  };

  const getUserInfo = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user || null;
  };

  const addComments = async ({ threadId, commentThread }) => {
    if (accessToken === null) {
      alert('Harus Login Dulu Kalau Mau Komentar');
    }
    if (commentThread.trim() === '') {
      return alert('Tolong isi komentarnya dulu sebelum kirim');
    }

    await dispatch(asyncAddComments(threadId, commentThread));
    dispatch(asyncShowDetailThreads({ threadId: threadId }));
    setComment('');
  };

  return (
    <>
      <div className="md:ml-[8rem] p-5">
        <div className="mb-[10rem] container mx-auto ">
          <h1 className="font-bold text-2xl mb-4">{threadDetails.title}</h1>
          <p className="mb-7 italic">#{threadDetails.category}</p>
          {functionHelper.stringToHtml(threadDetails.body)}
          <div className="flex mt-10 items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-lg ">
                <div
                  onClick={() => addLikes(threadDetails.id)}
                  className="cursor-pointer p-2 hover:bg-slate-200"
                >
                  {hasLiked() ? <FaThumbsUp /> : <FaRegThumbsUp />}
                </div>
                <p>
                  {threadDetails.upVotesBy ? threadDetails.upVotesBy.length : 0}
                </p>
              </div>
              <div className="flex items-center gap-1 text-lg ">
                <div
                  onClick={() => dislikes(threadDetails.id)}
                  className="cursor-pointer p-2 hover:bg-slate-200"
                >
                  {hasDisliked() ? <FaThumbsDown /> : <FaRegThumbsDown />}
                </div>
                <p>
                  {threadDetails.downVotesBy
                    ? threadDetails.downVotesBy.length
                    : 0}
                </p>
              </div>
              <div className="flex items-center gap-1 text-lg ">
                <div className="cursor-pointer p-2 hover:bg-slate-200">
                  <IoChatbubblesOutline />
                </div>
                <p>
                  {threadDetails.comments ? threadDetails.comments.length : 0}
                </p>
              </div>
            </div>
            <div className="flex">
              <h1 className="font-bold text-sm flex items-center gap-4">
                Dibuat Oleh:{' '}
                {getUserInfo(threadDetails.owner?.id) ? (
                  <>
                    {getUserInfo(threadDetails.owner.id).name} <br />
                    <img
                      className="w-[2rem]"
                      src={getUserInfo(threadDetails.owner.id).avatar}
                      alt="avatar"
                    />
                  </>
                ) : (
                  'User not found'
                )}
              </h1>
            </div>
          </div>
          <Comments
            threadDetails={threadDetails}
            addComments={addComments}
            comment={comment}
            setComment={setComment}
          />
          <CommentsList threadDetails={threadDetails} />
        </div>
      </div>
    </>
  );
};

export default DetailThreadsPage;
