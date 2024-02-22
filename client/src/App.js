import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

import Login from "./components/account/Login";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // keep it false before deployment

  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <div style={{ marginTop: 64 }}>
            <Routes>
              {
                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
              }
              {
                <Route
                  path="/"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/" element={<Home />} />
                </Route>
              }
              {
                <Route
                  path="/create"
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path="/create" element={<CreatePost />} />
                </Route>
              }
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
