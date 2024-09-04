import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Home from "./pages/Home/Home";
import AllTasks from "./pages/AllTasks/AllTasks";
import PendingTasks from "./pages/PendingTasks/PendingTasks";
import CompletedTasks from "./pages/CompletedTasks/CompletedTasks";
import PrivateRoute from "./services/PrivateRoute";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/allTasks"
          element={
            <PrivateRoute>
              <Layout>
                <AllTasks />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pending"
          element={
            <PrivateRoute>
              <Layout>
                <PendingTasks />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <PrivateRoute>
              <Layout>
                <CompletedTasks />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
