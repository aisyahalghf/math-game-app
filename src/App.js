import HomePages from "./pages/HomePage";
import { useEffect, useState } from "react";
import Sign from "./pages/Sign";
import QuestionPage from "./pages/QuestionPage";
import { Route, Routes } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

function App() {
  const [dataUsers, setDataUsers] = useState("");
  const [dataLeaderBoard, setDataLeaderBoard] = useState([]);

  let id = localStorage.getItem("my_Token");
  const getUser = async () => {
    try {
      const userRef = collection(db, "user");
      if (id) {
        const snap = await getDoc(doc(db, "user", id));
        if (snap?.exists()) {
          setDataUsers(snap?.data());
          const dataUser = snap?.data();
          const querySnapshot = await getDocs(
            query(
              userRef,
              where("level", "==", dataUser?.level),
              orderBy("score", "desc"),
              limit(5)
            )
          );
          const datas = querySnapshot.docs.map((doc) => doc.data());
          setDataLeaderBoard(datas);
        } else {
          const querySnapshot = await getDocs(
            query(
              userRef,
              where("level", "==", "easy"),
              orderBy("score", "desc"),
              limit(5)
            )
          );
          const datas = querySnapshot.docs.map((doc) => doc.data());
          setDataLeaderBoard(datas);
        }
      } else {
        const querySnapshot = await getDocs(
          query(
            userRef,
            where("level", "==", "easy"),
            orderBy("score", "desc"),
            limit(5)
          )
        );
        const datas = querySnapshot.docs.map((doc) => doc.data());
        setDataLeaderBoard(datas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePages
              dataUser={dataUsers}
              dataLeaderBoard={dataLeaderBoard}
              getUser={getUser}
            />
          }
        />
        <Route
          path="/sign"
          element={<Sign getUser={getUser} dataUser={dataUsers} />}
        />
        <Route
          path="/quiz"
          element={<QuestionPage dataUser={dataUsers} getUser={getUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
