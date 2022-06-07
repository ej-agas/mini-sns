import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewSingePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("mini_sns_token"))
  );
  const [flashMessages, setFlashMessages] = useState([]);

  const addFlashMessage = (message) => {
    setFlashMessages((prev) => prev.concat(message));
  };

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <FlashMessages messages={flashMessages} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/posts/:id" element={<ViewSingePost />} />
        <Route
          path="/create-post"
          element={<CreatePost addFlashMessage={addFlashMessage} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
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
