import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { apiBaseUrl } from "../constants";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Page from "./Page";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function EditPost() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    id: useParams().id,
    title: {
      value: "",
      errors: [],
    },
    body: {
      value: "",
      errors: [],
    },
    isFetching: true,
    isUpdating: false,
    requestCount: 0,
  };
  const reducerFn = (draft, action) => {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case "titleChange":
        console.log(action);
        draft.title.value = action.value;
        return;
      case "bodyChange":
        console.log(action);
        draft.body.value = action.value;
        return;
      case "submitRequest":
        draft.requestCount++;
        return;
      case "updateRequestStarted":
        draft.isUpdating = true;
        return;
      case "updateRequestFinished":
        draft.isUpdating = false;
        return;
    }
  };
  const [state, dispatch] = useImmerReducer(reducerFn, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "submitRequest" });
    console.log(state);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getPost = async () => {
      const api = `${apiBaseUrl}/post/${state.id}`;

      try {
        const response = await fetch(api, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal,
        });
        const data = await response.json();
        dispatch({ type: "fetchComplete", value: data });
      } catch (e) {
        console.log(e);
      }
    };

    getPost();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (state.requestCount === 0) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const getPost = async () => {
      dispatch({ type: "updateRequestStarted" });
      const api = `${apiBaseUrl}/post/${state.id}/edit`;

      const payload = {
        title: state.title.value,
        body: state.body.value,
        token: appState.user.token,
      };
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal,
        });
        dispatch({ type: "updateRequestFinished" });
        appDispatch({ type: "flashMessage", value: "Post Was Updated" });
      } catch (e) {
        console.log(e);
      }
    };

    getPost();
    return () => {
      controller.abort();
    };
  }, [state.requestCount]);

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  return (
    <Page title="Edit Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={(e) =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
            value={state.title.value}
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
            onChange={(e) =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
            value={state.body.value}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          />
        </div>

        <button className="btn btn-primary" disabled={state.isUpdating}>
          {state.isUpdating ? "Updating Post..." : "Update Post"}
        </button>
      </form>
    </Page>
  );
}

export default EditPost;
