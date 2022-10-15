import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import NovelMap from "./NovelMap";
import styles from "../css/Pagination.module.css";

function Pagination({ itemsPerPage, items, userObj }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <NovelMap novelObj={currentItems} userObj={userObj} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        previousClassName={styles.previous_btn}
        nextClassName={styles.next_btn}
        containerClassName={styles.pageination_container}
        activeClassName={styles.active_btn}
      />
    </>
  );
}

export default Pagination;
