import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    //2nd argument of useReducer is the initial state
    user: null,
    authIsReady: false, // When we refresh our page everytime the logged in user is gone. So, we add this propery is for check whether a user is already logged in with the help of firebase.
  });

  // Below use effect code fires when out application first renders. This was added after the authIs Ready property was added.
  useEffect(() => {
    // this function is going to communicate with firebase to check whether there is an authentication status changes. If so, the callback function will be fired.
    /**
     * This call function is gonna fire everytime everytime there is some kind of authentication state change. So, even in the future after we perform this initial check a user logs in or out, we're also going to fire this function. Then we're going to dispatch this AUTH_IS_READY function as well, and we don't need to do that anymore.
     * We only need to do this once initially to find out the initial user. So, how do we then cancel this kind of subscription to authentication status once we performed this dispatch() once?
     * Well, like when we had a subscription to real time data in firestore annd we got an unsubscribe function returns to us we get the same thing right here. (unsub variable here)
     * When we invoke that returned function(unsub), it unsubscribe from this listener(onAuthStateChanged()).
     */
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
