import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, authService } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Pagination from "../components/Pagination";

export default function Home({ userObj }) {
  const [novel, setNovel] = useState([]);
  const [sort, setSort] = useState(true);
  useEffect(() => {
    onSnapshot(
      query(
        collection(dbService, "novel"),
        orderBy("createdAt", sort ? "desc" : "asc")
      ),
      (snapshot) => {
        const novelArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNovel(novelArray);
      }
    );
  }, [sort]);
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
        <button onClick={toggleSortClick}>{sort ? "Reverse" : "Sort"}</button>
      </div>
      <div>
        <button
          onClick={() => {
            authService.signOut();
          }}
        >
          Log Out
        </button>
      </div>
      <Pagination items={novel} userObj={userObj} itemsPerPage={5} />
    </div>
  );
}
