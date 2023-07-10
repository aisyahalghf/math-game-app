import HomePages from "./pages/HomePage";
import Sign from "./pages/Sign";
import QuestionPage from "./pages/QuestionPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/quiz" element={<QuestionPage />} />
      </Routes>
    </div>
  );
}

export default App;
