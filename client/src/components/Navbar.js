import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Train from "../assets/img/train.png";
import Landtick from "../assets/img/landtick.png";
import Poto from "../assets/img/boy.png";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import more from "../assets/img/more.png";
import logOut from "../assets/img/logout.png";
import { UserContext } from "./context/UserContext";
import tiket from "../assets/img/ticket.png";
import bill from "../assets/img/bill.png";
import ModalLogin from "../modal/ModalLogin";
import ModalRegister from "../modal/ModalRegister";
import { useNavigate } from "react-router-dom";

const styles = {
  navbar: {
    boxShadow: "0px 2px 2px 0px gray",
    borderColor: "#000000",
  },
  nav2: {
    padding: "0px 70px 0px 70px",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "30px",
    height: "30px",
    borderRadius: "30px",
    cursor: "pointer",
  },
  divimg: {
    borderRadius: "30px",
    border: "3px solid #EC7AB7",
    marginLeft: "20px",
    padding: "10px 5px 0px 5px",
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "70px",
    right: "100px",
    backgroundColor: "white",
    border: "5px",
    borderColor: "#000000",
    boxShadow: "1px 2px 3px 1px grey",
    borderRadius: "10px",
    paddingBottom: "15px",
  },
  dropdown2: {
    padding: "15px 70px 0px 15px",
    display: "flex",
  },
  modal: {
    width: "20rem",
    position: "absolute",
    left: "40%",
    top: "50%",
  },
  text: {
    fontSize: "24px",
    background: "linear-gradient(to right, #ec7ab7, #ec7a7a)",
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent",
    cursor: "pointer",
  },
  text2: {
    fontSize: "20px",
    padding: "3px 0px 0px 15px",
  },
  bdaftar: {
    color: "#EC7AB7",
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    padding: "5px 5px",
    margin: "0px 5px 0px 0px",
    borderColor: "#EC7AB7",
    width: "150px",
  },
  blogin: {
    color: "#FFFFFF",
    backgroundImage: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    borderRadius: "5px",
    padding: "5px 5px",
    margin: "0px 0px 0px 5px",
    borderColor: "#0000",
    width: "150px",
  },

  nav: {
    padding: "0px 70px 0px 70px",
  },
};

function Nav() {
  const navigate = useNavigate();
  const home = () => navigate("/");
  const adminHome = () => navigate("/admin");
  const addTicket = () => navigate("/addticket");
  const myTicket = () => navigate("/myticket");

  const [state, dispatch] = useContext(UserContext);
  console.log(state.user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <div>
      <Navbar
        fixed="top"
        className="d-flex justify-content-between px-5 bg-white"
      >
        <div style={styles.nav}>
          <img
            style={{ cursor: "pointer" }}
            onClick={home}
            src={Landtick}
            alt="landtick"
          ></img>
          <img src={Train} alt="train"></img>
        </div>
        {state?.isLogin ? (
          <div>
            {state.user.role === "admin" ? (
              <div style={styles.nav2}>
                <div onClick={adminHome} style={styles.text}>
                  {state.user.fullName}
                </div>
                <div style={styles.divimg}>
                  <img
                    onClick={setOpen}
                    src={Poto}
                    alt="Poto Profile"
                    style={styles.image}
                  />
                </div>
                {open && (
                  <div style={styles.dropdown}>
                    <DropdownItem
                      onClick={() => setOpen(false)}
                      style={styles.dropdown2}
                    >
                      <img src={more} alt="tiket" />
                      <div onClick={addTicket} style={styles.text2}>
                        Tambah Tiket
                      </div>
                    </DropdownItem>
                    <hr />
                    <DropdownItem className="px-3 d-flex">
                      <img src={logOut} alt="logout" />
                      <div onClick={logout} style={styles.text2}>
                        Logout
                      </div>
                    </DropdownItem>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.nav2}>
                <div onClick={home} style={styles.text}>
                  {state.user.fullName}
                </div>
                <div style={styles.divimg}>
                  <img
                    onClick={setOpen2}
                    src={Poto}
                    alt="Poto Profile"
                    style={styles.image}
                  />
                </div>
                {open2 && (
                  <div style={styles.dropdown}>
                    <DropdownItem
                      onClick={() => setOpen2(false)}
                      style={styles.dropdown2}
                    >
                      <img src={tiket} alt="tiket" />
                      <div onClick={myTicket} style={styles.text2}>
                        Tiket Saya
                      </div>
                    </DropdownItem>
                    <hr />
                    <DropdownItem
                      onClick={() => setOpen(false)}
                      className="px-3 d-flex"
                    >
                      <img src={logOut} alt="logout" />
                      <div onClick={logout} style={styles.text2}>
                        Logout
                      </div>
                    </DropdownItem>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={styles.nav}>
            <button onClick={handleShowRegister} style={styles.bdaftar}>
              DAFTAR
            </button>
            <button onClick={handleShowLogin} style={styles.blogin}>
              LOGIN
            </button>
          </div>
        )}
        <ModalLogin
          show={showLogin}
          onHide={() => setShowLogin(false)}
          showRegister={setShowRegister}
        />
        <ModalRegister
          show={showRegister}
          showLogin={setShowLogin}
          onHide={() => setShowRegister(false)}
        />
      </Navbar>
    </div>
  );
}

export default Nav;
