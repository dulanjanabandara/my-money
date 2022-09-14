import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext); // this "context" will be { ...state, dispatch } by the AuthContext provider value.

  if (!context) {
    throw Error("useAuthContext must be inside an AuthContextProvider");
  }

  return context;
};
