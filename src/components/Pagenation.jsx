import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function Pagenation({ total, limit, setPage }) {
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(
    Math.ceil(total / limit) <= 5 ? Math.ceil(total / limit) : 5
  );
  const numPages = Math.ceil(total / limit);
  let arr = [];
  const arrMap = () => {
    Array(total + 1)
      .fill()
      .map((_, index) => arr.push(index));
  };
  arrMap();
  return (
    <>
      <nav>
        <button
          onClick={() => {
            setStartIndex((prev) => prev * 0);
            setLastIndex(
              Math.ceil(total / limit) <= 5 ? Math.ceil(total / limit) : 5
            );
          }}
          disabled={startIndex === 0}
        >
          &lt;
        </button>
        {arr.slice(startIndex, lastIndex).map((item) => (
          <button
            key={uuidv4()}
            onClick={() => {
              setPage(item + 1);
              if (numPages > 5) {
                if (startIndex === item) {
                  setStartIndex((prev) => (prev !== 0 ? prev - 1 : prev));
                  setLastIndex((prev) => (prev > 5 ? prev - 1 : prev));
                } else if (lastIndex === item + 1) {
                  if (lastIndex < total && numPages > lastIndex) {
                    setStartIndex((prev) => prev + 1);
                    setLastIndex((prev) => prev + 1);
                  }
                }
              }
            }}
          >
            {item + 1}
          </button>
        ))}
        <button
          onClick={() => {
            setStartIndex(numPages - 5);
            setLastIndex(numPages);
          }}
          disabled={lastIndex === numPages}
        >
          &gt;
        </button>
      </nav>
    </>
  );
}
