import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [sort, setSort] = useState(true);
  const navigate = useNavigate();
  const toggleSortClick = () => setSort((prev) => !prev);
  return (
    <div>
      <h1>Novel</h1>
      <div>
        <button
          onClick={() => {
            navigate("/write");
          }}
        >
          Novel Write
        </button>
        <button onClick={toggleSortClick}>{sort ? "Sort" : "Reverse"}</button>
      </div>
    </div>
  );
}
