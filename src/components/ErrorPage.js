import React, { useContext } from "react";
import PageContext from "../PageContext";

export default function ErrorPage() {
  const { handlePageChange, pageHistory } = useContext(PageContext);
  return (
    <div>
      <h2>404 :(</h2>
      Uh-oh! Couldn&apos;t find page &quot;{pageHistory[0]}&quot;!
      <button onClick={() => handlePageChange(pageHistory[1])}>Go back</button>
    </div>
  );
}
