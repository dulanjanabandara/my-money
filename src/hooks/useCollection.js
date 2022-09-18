// This hook is all about subscribing to real time data from a firestore collection.

import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];

        // .docs is a property on snapshot.
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id }); // .data() is the function we use to get data(name, amount, createdAt, uid properties) from a document.
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection]);

  return { documents, error };
};
