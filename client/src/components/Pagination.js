import React, { useState, useEffect } from "react";

const Pagination = ({
  goToPrevPage,
  goToNextPage,
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(currentPage);
  return (
    <>
      <ul>
        {/* <li> {goToPrevPage && <button onClick={goToPrevPage}>Prev</button>}</li> */}
        <li>
          {" "}
          <button disabled={!goToPrevPage} onClick={goToPrevPage}>
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button>{number}</button>
          </li>
        ))}
        <li>
          <button disabled={!goToNextPage} onClick={goToNextPage}>
            Next
          </button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
