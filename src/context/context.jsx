import { createContext, useReducer } from "react";
import { types } from "./types";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext("");
const initialState = {
  user: "",
  isAuhtheticated: false,
};
const reducer = (state, action) => {
  const { type: actionType, payload: actionpayload } = action;
  switch (actionType) {
    case types.login:
      return {
        ...state,
        user: actionpayload,
        isAuhtheticated: true,
      };
      break;
    case types.register:
      break;
    case types.logOut:
      return {
        actionpayload,
      };
      break;
    case types.recoveryPassword:
      break;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = (user, token) => {
    navigate("/");
    localStorage.setItem("token", token);

    dispatch({
      type: types.login,
      payload: user,
    });
  };

  const registerUser = () => {
    navigate("/auth/login");
  };

  const logOut = () => {
    navigate("/auth/login");
    localStorage.clear();
    dispatch({
      type: types.logOut,
      payload: initialState,
    });
  };

  return (
    <AuthContext.Provider value={{ login, state, logOut, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
