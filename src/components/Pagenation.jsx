import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function Pagenation({ total, limit, page, setPage }) {
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
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {arr.slice(startIndex, lastIndex).map((item) => (
          <button
            key={uuidv4()}
            onClick={() => {
              setPage(item + 1);
              if (numPages > 5) {
                if (startIndex === item) {
                  if (startIndex !== 0) {
                    setStartIndex((prev) => prev - 1);
                    if (lastIndex > 5) {
                      setLastIndex((prev) => prev - 1);
                    }
                  }
                } else if (lastIndex === item + 1) {
                  if (numPages > lastIndex) {
                    setStartIndex((prev) =>
                      lastIndex < total ? prev + 1 : prev + 0
                    );
                    setLastIndex((prev) =>
                      prev < total ? prev + 1 : prev + 0
                    );
                  }
                }
              }
            }}
            aria-current={page === item + 1 ? "page" : null}
          >
            {item + 1}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
}
