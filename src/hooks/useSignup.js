import { useState } from "react";
import { projectAuth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null); // setting previously occured errors back to null.
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res);
      console.log(res.user);

      if (!res) {
        throw new Error("Could not complete signup!");
      }

      //   add display name to user.
      //   First we have to create the user, thenn we have to update the profile of that user and set the displayName property.
      await res.user.updateProfile({ displayName });
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return {
    error,
    isPending,
    signup,
  };
};
