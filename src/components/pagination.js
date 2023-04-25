import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageLinks = [];

  // Add the first page button
  if (currentPage > 1) {
    pageLinks.push(
      <button key="first" onClick={() => onPageChange(1)}>
        {"<<"}
      </button>
    );
  }

  // Add the previous 5 pages buttons
  for (let i = currentPage - 5; i < currentPage; i++) {
    if (i > 0) {
      pageLinks.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
  }

  // Add the current page button
  pageLinks.push(
    <button key={currentPage} onClick={() => onPageChange(currentPage)} className="active">
      {currentPage}
    </button>
  );

  // Add the next 5 pages buttons
  for (let i = currentPage + 1; i <= Math.min(currentPage + 5, totalPages); i++) {
    pageLinks.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={i === currentPage ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  // Add the last page button
  if (currentPage < totalPages) {
    pageLinks.push(
      <button key="last" onClick={() => onPageChange(totalPages)}>
        {">>"}
      </button>
    );
  }

  return <div className="pagination">{pageLinks}</div>;
}
