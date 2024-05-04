import React, { useEffect } from "react";
import { asyncShowThread } from "../states/threads/action";
import { useDispatch, useSelector } from "react-redux";
import ThreadsItem from "../components/ThreadsItem";
import { Link } from "react-router-dom";
import {
  asyncLikeThread,
  asyncDislikeThread,
} from "../states/likeThreads/action";
import { FaSquarePlus } from "react-icons/fa6";

const HomePage = () => {
  const threads = useSelector((state) => state.showThreads);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncShowThread());
  }, [dispatch]);

  const addLikes = async (id) => {
    try {
      await dispatch(asyncLikeThread({ threadId: id }));
      dispatch(asyncShowThread());
    } catch (error) {
      alert(error.message);
    }
  };

  const dislikes = async (id) => {
    try {
      await dispatch(asyncDislikeThread({ threadId: id }));
      dispatch(asyncShowThread());
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="md:ml-[8rem] p-5">
        <div className="mb-[10rem] container mx-auto ">
          <h1 className="font-bold text-3xl">Threads</h1>
          <ThreadsItem threads={threads} likes={addLikes} dislikes={dislikes} />
          <Link to="/addThreads">
            <div className="fixed bottom-8 right-10 text-[3rem]">
              <FaSquarePlus />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
