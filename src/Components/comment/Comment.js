import { useState } from "react";
import styled from "styled-components";

const CommentStyled = styled.div`
  margin: auto;
  margin-top: 50px;
  width: 100%;
  height: auto;
  input {
    width: 100%;
    height: 50px;
    outline: none;
    background-color: rgb(25, 26, 46);
    border: none;
    border-bottom: 2px solid white;
    color: white;
  }
  .btn-block {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    margin-top: 50px;
    list-style: none;
    li:hover .icon {
      display: block;
    }
    li {
      position: relative;
    }
  }
  .icon {
    display: none;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Comment = () => {
  const [comment, setComment] = useState("");
  const [getComment, setGetComment] = useState([]);
  function handleAdd() {
    if (comment) {
      setGetComment((pre) => [...pre, comment]);
      setComment("");
    }
  }
  function handleCancel() {
    setComment("");
  }
  function handleDelete(index) {
    let newComment = [...getComment];
    newComment.splice(index, 1);
    setGetComment(newComment);
  }
  return (
    <CommentStyled className="comment-box">
      <input
        type="text"
        value={comment}
        placeholder="Enter your comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="btn-block">
        <button className="btn btn-outline-primary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul>
        {getComment &&
          getComment.map((item, index) => (
            <li key={index} className="">
              <div className="d-flex justify-content-between align-items-center">
                <p>{item}</p>
                <span className="icon" onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </li>
          ))}
      </ul>
    </CommentStyled>
  );
};

export default Comment;
