import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";

// get collection snapshot
export function useCollection(query) {
  const [snapshot, setSnapshot] = useState();
  const [isLoading, setIsLoading] = useState(true); //this seems redundant...
  const [error, setError] = useState();

  useEffect(async () => {
    const db = firebase.firestore();
    const data = await db.collection(query).get();

    if (!data) {
      setError("Could not retrieve data!");
    } else {
      setSnapshot(data);
    }

    setIsLoading(false);
  }, []);

  return [snapshot, isLoading, error];
}

export function useAddDocument(query, data) {
  const [addedDocument, setAddedDocument] = useState();

  useEffect(async () => {
    const db = firebase.firestore();
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const addedDocReference = await db
      .collection(query)
      .add({ ...data, timestamp: serverTimestamp() });
    console.log(addedDocReference);
    setAddedDocument(addedDocReference);
  }, []);

  return [addedDocument];
}
