import React, { useState, useContext } from "react";
import { apiBaseUrl } from "../constants";
import SnsContext from "../SnsContext";

function HeaderLoggedOut() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(SnsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${apiBaseUrl}/login`;

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data) {
        localStorage.setItem("mini_sns_token", data.token);
        localStorage.setItem("mini_sns_username", data.username);
        localStorage.setItem("mini_sns_avatar", data.avatar);

        setLoggedIn(true);
        return;
      }

      console.log("Incorrect username/password.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
