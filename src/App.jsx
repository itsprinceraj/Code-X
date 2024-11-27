import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Home } from "./pages/Home";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { CodeEditor } from "./pages/CodeEditor";
import { useState } from "react";
function App() {
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loader={loader}
              setLoader={setLoader}
              setLoading={setPageLoader}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/editor/:projectId"
          element={
            <CodeEditor loading={pageLoader} setLoading={setPageLoader} />
          }
        />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
