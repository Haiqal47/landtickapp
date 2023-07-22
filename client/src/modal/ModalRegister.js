import React from "react";
import { Modal, ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useMutation } from "react-query";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

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

function ModalRegister(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      console.log("register success : ", response);

      setForm({
        fullName: "",
        userName: "",
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log("Register Failed : ", error);
    }
  });
  return (
    <Modal {...props} show={props.show} onHide={props.onHide}>
      <ModalBody>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <h1 style={styles.flogin} className="p-3 text-center">
            Daftar
          </h1>
          <div className="px-3 pb-3">
            <input
              onChange={handleChange}
              type="text"
              name="fullName"
              value={form.fullName}
              className="form-control"
              placeholder="Nama Lengkap"
            />
          </div>
          <div className="px-3">
            <input
              onChange={handleChange}
              type="text"
              name="userName"
              value={form.userName}
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="p-3">
            <input
              onChange={handleChange}
              type="text"
              name="email"
              value={form.email}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="px-3 pb-3">
            <input
              onChange={handleChange}
              name="password"
              value={form.password}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="px-3 pb-3">
            <Button
              onClick={props.onHide}
              style={styles.blogin2}
              type="submit"
              className="w-100"
            >
              Register
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default ModalRegister;
