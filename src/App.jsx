import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Home } from "./pages/Home";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { CodeEditor } from "./pages/CodeEditor";
import { useState } from "react";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { OpenRoute } from "./components/auth/OpenRoute";
function App() {
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                loader={loader}
                setLoader={setLoader}
                setLoading={setPageLoader}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/editor/:projectId"
          element={
            <ProtectedRoute>
              <CodeEditor loading={pageLoader} setLoading={setPageLoader} />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
