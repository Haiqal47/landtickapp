import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import Home from "./pages/Home";
import MyTicket from "./pages/MyTicket";
import Payment from "./pages/Payment";
import Admin from "./pages/admin/Admin";
import AddTicket from "./pages/admin/AddTicket";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  PrivateRoute,
  PrivateRouteAdmin,
  PrivateRouteUser,
} from "./privatroute/PrivateRoute";
import { UserContext } from "./components/context/UserContext";
import { API, setAuthToken } from "./config/api";
import Nav from "../src/components/Navbar";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      setIsLoading(false);
    } catch (err) {
      console.log("Check User Failed : ", err);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoading && !state.isLogin) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoading, state.isLogin, navigate]);
  return (
    <div>
      <Nav />
      {isLoading ? null : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateRouteUser />}>
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/addticket" element={<AddTicket />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route exact path="/myticket" element={<MyTicket />} />
              <Route exact path="/payment/:id" element={<Payment />} />
            </Route>
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
