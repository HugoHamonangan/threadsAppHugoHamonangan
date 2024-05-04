import { Routes, Route } from "react-router-dom";
import LeaderboardPage from "./pages/LeaderboardPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NotFound404Page from "./pages/NotFound404Page";
import DetailThreadsPage from "./pages/DetailThreadsPage";
import Navbar from "./components/Navbar";
import AddThreads from "./pages/AddThreads";
import LoadingBar from "react-redux-loading-bar";

function App() {
  return (
    <>
      <LoadingBar
        style={{
          backgroundColor: "blue",
          height: "7px",
          position: "fixed",
          top: 0,
          zIndex: 30,
        }}
      />
      <Routes>
        <Route path="*" element={<NotFound404Page />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
        <Route path="/threads/:id" element={<DetailThreadsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/addThreads" element={<AddThreads />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
