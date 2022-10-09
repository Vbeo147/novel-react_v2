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
    if (page !== numPages) {
      setStartIndex(Math.floor(page / BtnLimit) * BtnLimit);
      setLastIndex((page % numPages) * BtnLimit);
    }
  }, [page, BtnLimit, numPages, total]);
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
      <nav>
        <button
          onClick={() => {
            setPage(1);
          }}
          disabled={startIndex === 0}
        >
          &lt;&lt;
        </button>
        {arr
          .slice(lastIndex < 5 ? lastIndex - 1 : startIndex, lastIndex)
          .map((item) => (
            <button
              key={item}
              onClick={() => {
                setPage(item + 1);
              }}
            >
              {item + 1}
            </button>
          ))}
        <button
          onClick={() => {
            setPage(numPages);
          }}
          disabled={lastIndex === numPages}
        >
          &gt;&gt;
        </button>
      </nav>
    </>
  );
}
