import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // sign out the user
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      dispatch({ type: "LOGIN", payload: res });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // Any time we're using a hook like this, which is going to update states in a component, then we should use a clean-up function.
  // In fetch api we have abort controller to abort the fetch. In firestore real time data, we used unsubscribe function which we can call in the cleanup function.
  // But we cannot use any of those here. So, we have to do a bit more of manual approach. -> ([isCancelled, setIsCancelled])
  // Clean up function should be in the useEffect() hook.
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
