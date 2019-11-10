import React from "react";

const Pagination = ({
  goToPrevPage,
  goToNextPage,
  totalPosts,
  postsPerPage,
  paginate,
  loading
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleClick = number => {
    paginate(number);
  };

  return (
    <nav className="pagination">
      <ul>
        <li>
          <button disabled={!goToPrevPage} onClick={goToPrevPage}>
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => handleClick(number)}>{number}</button>
          </li>
        ))}
        <li>
          <button disabled={!goToNextPage} onClick={goToNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
