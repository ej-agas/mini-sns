import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewSingePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";
import Profile from "./components/Profile";
import EditPost from "./components/EditPost";

const Main = () => {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("mini_sns_token")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("mini_sns_token"),
      username: localStorage.getItem("mini_sns_username"),
      avatar: localStorage.getItem("mini_sns_avatar"),
    },
  };
  const reducerFn = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        break;
      case "logout":
        draft.loggedIn = false;
        break;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducerFn, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("mini_sns_token", state.user.token);
      localStorage.setItem("mini_sns_username", state.user.username);
      localStorage.setItem("mini_sns_avatar", state.user.avatar);

      return;
    }

    localStorage.removeItem("mini_sns_token");
    localStorage.removeItem("mini_sns_username");
    localStorage.removeItem("mini_sns_avatar");
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/posts/:id" element={<ViewSingePost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile/:username/*" element={<Profile />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
