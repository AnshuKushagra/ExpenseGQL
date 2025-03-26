import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import TransactionPage from "./Pages/TransactionPage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import Header from "./Components/UI/Header.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query.js";

function App() {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  // CONSOLE
  console.log("Authenticated user");
  console.log("Loading", loading);
  console.log(data.authUser);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
