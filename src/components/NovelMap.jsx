import { useEffect, useState } from "react";
import { dbService } from "../firebase";

export default function NovelMap({ sort }) {
  const [novel, setNovel] = useState([]);
  useEffect(() => {
    dbService.collection("novel").onSnapshot((snapshot) => {
      const novelArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNovel(novelArray);
    });
  }, []);
  console.log(novel);
  return (
    <div>
      {novel.map((novels) => (
        <div key={novels.id}>
          <div>{novels.novel.title}</div>
        </div>
      ))}
    </div>
  );
}
