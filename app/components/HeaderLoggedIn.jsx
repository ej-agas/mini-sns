import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";

function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext);

  const handleLogout = () => {
    appDispatch({ type: "logout" });
    localStorage.removeItem("mini_sns_token");
    localStorage.removeItem("mini_sns_username");
    localStorage.removeItem("mini_sns_avatar");
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <a href="#" className="mr-2">
        <img
          className="small-header-avatar"
          src={localStorage.getItem("mini_sns_avatar")}
        />
      </a>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button
        onClick={() => {
          handleLogout();
        }}
        className="btn btn-sm btn-secondary"
      >
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
