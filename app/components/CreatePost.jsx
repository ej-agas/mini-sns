import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import { apiBaseUrl } from "../constants";
import SnsContext from "../SnsContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { addFlashMessage } = useContext(SnsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = `${apiBaseUrl}/create-post`;

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          token: localStorage.getItem("mini_sns_token"),
        }),
      });

      const data = await response.json();

      if (data) {
        addFlashMessage("Post Created.");
        navigate(`/posts/${data}`);
        return;
      }

      console.log("There was a problem creating post.");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default CreatePost;
