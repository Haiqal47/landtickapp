import React, { useContext, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
// import jwt_decode from "jwt-decode";

const styles = {
  flogin: {
    background: "linear-gradient(to bottom, #ec7ab7, #ec7a7a)",
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent",
  },
  blogin2: {
    color: "#FFFFFF",
    backgroundImage: "linear-gradient(to bottom, #EC7AB7, #EC7A7A)",
    borderRadius: "30px",
    borderColor: "#0000",
  },
};

function ModalLogin(props) {
  const switchModal = () => {
    props.onHide();
    props.showRegister(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form, config);
      console.log(response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.users,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.users.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setForm({
        userName: "",
        password: "",
      });
    } catch (err) {
      console.log("login failed : ", err);
    }
  });

  return (
    <Modal {...props} show={props.show} onHide={props.onHide}>
      <ModalBody>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <h1 style={styles.flogin} className="p-3 text-center">
            Login
          </h1>
          <div className="px-3 pb-3">
            <input
              onChange={handleChange}
              value={form.userName}
              className="form-control"
              name="userName"
              placeholder="Username"
              required
            />
          </div>
          <div className="px-3 pb-3">
            <input
              onChange={handleChange}
              value={form.password}
              className="form-control"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="px-3 pb-3">
            <Button
              onClick={props.onHide}
              style={styles.blogin2}
              type="submit"
              className="w-100"
            >
              Login
            </Button>
          </div>
        </form>
        <p className="text-center">
          Belum Punya Akun ? Klik{" "}
          <span onClick={switchModal} style={{ cursor: "pointer" }}>
            Disini
          </span>
        </p>
      </ModalBody>
    </Modal>
  );
}
export default ModalLogin;
