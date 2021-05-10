import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";

// get collection snapshot
export function useCollection(query) {
  const [collectionRef, setCollectionRef] = useState();
  const [error, setError] = useState();

  useEffect(async () => {
    const db = firebase.firestore();
    const data = await db.collection(query);

    if (!data) {
      setError("Could not retrieve data!");
    } else {
      setCollectionRef(data);
    }
  }, []);

  return [collectionRef, error];
}

export function useGetTargets() {
  const [targetsRef, error] = useCollection("targets");
  const [targets, setTargets] = useState();

  useEffect(async () => {
    if (targetsRef) {
      const _targets = await targetsRef.get();
      setTargets(_targets);
    }
  }, [targetsRef]);

  return [targets, error];
}

export function useGetHighscores() {
  const [highscoreRef, error] = useCollection("highscores");
  const [highscores, setHighscores] = useState();

  useEffect(async () => {
    if (highscoreRef) {
      const hs = await highscoreRef.orderBy("score", "asc").limit(5).get();
      setHighscores(hs);
    }
  }, [highscoreRef]);

  return [highscores, error];
}

export async function addHighscore(newScore) {
  const db = firebase.firestore();
  const { serverTimestamp } = firebase.firestore.FieldValue;
  const highscores = await db.collection("highscores");
  await highscores.add({ ...newScore, timestamp: serverTimestamp() });

  // delete lowest score
  const sortedScores = await highscores.orderBy("score", "desc").get();

  if (!sortedScores.empty && sortedScores.size > 5) {
    const lowestScore = sortedScores.docs[0];
    lowestScore.ref.delete();
    console.log(
      `${lowestScore.data().name}'s score of ${
        lowestScore.data().score
      } deleted!`
    );
  } else {
    console.log("no lowest score to delete???");
  }
}
