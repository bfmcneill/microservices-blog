import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
    // console.log("comments: ", res.data);
    // console.log("comments dtype: ", comments.constructor.name);
    // console.log("called fetchData");
    // console.log("----------------");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
}

export default CommentList;
