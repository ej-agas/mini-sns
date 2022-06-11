import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      const api = `${apiBaseUrl}/profile/${username}/posts`;

      try {
        const response = await fetch(api, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        setPosts(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getPosts();
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const formattedDate = `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getDate()}, ${date.getFullYear()}`;

        return (
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={post.author.avatar} />{" "}
            <strong>{post.title}</strong>{" "}
            <span className="text-muted small">{formattedDate}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
