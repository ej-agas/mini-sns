import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Page from "./Page";

function ViewSingePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getPost = async () => {
      const api = `${apiBaseUrl}/post/${id}`;

      try {
        const response = await fetch(api, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal,
        });
        const data = await response.json();

        setPost(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getPost();
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const formattedDate = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {formattedDate}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  );
}

export default ViewSingePost;
