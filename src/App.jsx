import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Home } from "./pages/Home";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { CodeEditor } from "./pages/CodeEditor";
import { useState } from "react";
function App() {
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home
                loader={loader}
                setLoader={setLoader}
                setLoading={setPageLoader}
              />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        ></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/editor/:projectId"
          element={
            isLoggedIn ? (
              <CodeEditor loading={pageLoader} setLoading={setPageLoader} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="*"
          element={isLoggedIn ? <NotFoundPage /> : <Navigate to={"/login"} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
