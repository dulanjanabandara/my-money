// Add new document to firestore collection
// Remove a document from firestore collection

import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false); // uses for our cleanup function

  // stores a collection reference to ref variable
  const ref = projectFirestore.collection(collection);

  // add document
  const addDocument = async (doc) => {};

  //  delete document
  const deleteDocument = async (id) => {};

  //  cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
