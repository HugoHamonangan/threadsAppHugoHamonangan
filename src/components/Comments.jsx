import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Comments = ({ threadDetails, addComments, comment, setComment }) => {
  const threadId = threadDetails.id;
  return (
    <div className="mt-11">
      <h1 className="font-bold">Tambah komentar</h1>
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          addComments({ threadId: threadId, commentThread: comment });
        }}
      >
        <textarea
          id="comment"
          cols="30"
          rows="10"
          className="border w-full p-3"
          placeholder="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 mt-4 hover:bg-blue-600"
        >
          Kiri
        </button>
      </form>
    </div>
  );
};

Comments.propTypes = {
  threadDetails: PropTypes.any,
  addComments: PropTypes.func.isRequired,
};

export default Comments;
