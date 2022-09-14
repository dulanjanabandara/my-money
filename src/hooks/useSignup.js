import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null); // setting previously occured errors back to null.
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // console.log(res.user);

      if (!res) {
        throw new Error("Could not complete signup!");
      }

      //   add display name to user.
      //   First we have to create the user, thenn we have to update the profile of that user and set the displayName property.
      await res.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

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

  return {
    error,
    isPending,
    signup,
  };
};
