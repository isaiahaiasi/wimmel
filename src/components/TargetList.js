import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import * as S from "../styled-components/_styled-index";

export default function TargetList({ targets = [] }) {
  const storage = firebase.storage();

  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    targets.forEach(async (target) => {
      const imageURL = await storage.refFromURL(target.img).getDownloadURL();
      setImageURLs((prevImageURLs) => ({
        ...prevImageURLs,
        [target.targetName]: imageURL,
      }));
    });
  }, [targets]);

  return (
    <S.TargetList>
      {targets.map((target, i) => {
        return (
          <li key={target.targetName + i}>
            <img src={imageURLs[target.targetName] ?? ""} />
            <p>{target.targetName}</p>
          </li>
        );
      })}
    </S.TargetList>
  );
}
