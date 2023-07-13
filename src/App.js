import HomePages from "./pages/HomePage";
import { useEffect, useState } from "react";
import Sign from "./pages/Sign";
import QuestionPage from "./pages/QuestionPage";
import { Route, Routes } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [dataUser, setDataUser] = useState("");
  let id = localStorage.getItem("my_Token");
  console.log(id);
  const getUser = async () => {
    try {
      if (id) {
        const snap = await getDoc(doc(db, "user", id));
        if (snap?.exists()) {
          setDataUser(snap?.data());
        } else {
          console.log("No such document");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<HomePages dataUser={dataUser} getUser={getUser} />}
        />
        <Route path="/sign" element={<Sign />} />
        <Route path="/quiz" element={<QuestionPage dataUser={dataUser} />} />
      </Routes>
    </div>
  );
}

export default App;
