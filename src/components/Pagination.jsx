import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import NovelMap from "./NovelMap";
import styles from "../css/Pagination.module.css";

function Pagination({ itemsPerPage, items, userObj, sort }) {
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
      <NovelMap novelObj={currentItems} userObj={userObj} sort={sort} />
      <div className={styles.pagination_container}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          previousClassName={styles.pagination_previous_btn}
          nextClassName={styles.pagination_next_btn}
          containerClassName={styles.pagination_ul}
          activeClassName={styles.pagination_active_btn}
        />
      </div>
    </>
  );
}

export default Pagination;