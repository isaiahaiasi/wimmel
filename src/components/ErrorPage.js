import React, { useContext } from "react";
import PageContext from "../PageContext";

export default function ErrorPage() {
  const { handlePageChange, pages, currentPage } = useContext(PageContext);
  return (
    <div>
      <h2>404 :(</h2>
      Uh-oh! Couldn&apos;t find page &quot;{currentPage}&quot;!
      <button onClick={() => handlePageChange(pages.intro)}>Go home</button>
    </div>
  );
}
