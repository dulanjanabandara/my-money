import { useState, useContext, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign out the user
    try {
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });

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

  return { logout, error, isPending };
};
