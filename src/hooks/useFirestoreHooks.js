import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";

// get collection snapshot
export function useCollection(query) {
  const [snapshot, setSnapshot] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    const db = firebase.firestore();
    const data = await db.collection(query).get();

    if (!data) {
      setError("Could not retrieve data!");
    } else {
      setSnapshot(data);
      console.log(data);
    }

    setIsLoading(false);
  }, []);

  return [snapshot, isLoading, error];
}
