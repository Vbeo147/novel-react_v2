import { useState, useEffect } from "react";

export default function Pagenation({
  total,
  BtnLimit,
  numPages,
  setPage,
  page,
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  useEffect(() => {
    const startCal = Math.floor(page / BtnLimit) * BtnLimit;
    const lastCal = startIndex + BtnLimit;
    if (page !== numPages) {
      setStartIndex(startCal);
      setLastIndex(lastCal > numPages ? numPages : lastCal);
    }
  }, [page, BtnLimit, numPages, startIndex]);
  let arr = [];
  const arrMap = () => {
    Array(total + 1)
      .fill()
      .map((_, index) => arr.push(index));
  };
  arrMap();
  console.log(
    `Start : ${startIndex}, Last : ${lastIndex}, Pages : ${numPages}`
  );
  return (
    <>
      <div>현재 페이지 : {page}</div>
      <nav>
        <span>
          <button
            onClick={() => {
              setPage(1);
            }}
            disabled={page === 1}
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          >
            &lt;
          </button>
        </span>
        {arr.slice(startIndex, lastIndex).map((item) => (
          <button
            key={item}
            onClick={() => {
              setPage(item + 1);
            }}
          >
            {item + 1}
          </button>
        ))}
        <span>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === numPages}
          >
            &gt;
          </button>
          <button
            onClick={() => {
              setPage(numPages);
              setStartIndex(numPages - 1);
              setLastIndex(numPages);
            }}
            disabled={page === numPages}
          >
            &gt;&gt;
          </button>
        </span>
      </nav>
    </>
  );
}
