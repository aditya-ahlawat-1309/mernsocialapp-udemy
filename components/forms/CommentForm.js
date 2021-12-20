import React from 'react'

const CommentForm = ({setComment, addComment, comment}) => {
  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        className="form-control"
        placeholder="Write something ..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-primary btn-sm btn-block mt-3">Submit</button>
    </form>
  );
}

export default CommentForm
