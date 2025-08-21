import { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "./Reducer";
import axios from "axios"
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE); //warehouse of data, every user has being store here.

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },
[state.user])

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
