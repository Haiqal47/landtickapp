import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Iklan from "../assets/img/Iklan.png";

const styles = {
  Header: {
    paddingTop: "85px",
    paddingBottom: "30px",
  },
  P1: {
    fontFamily: "Avenir",
    fontWeight: "Bold",
    color: "White",
    fontSize: "36px",
  },
  P2: {
    fontFamily: "Avenir",
    fontSize: "24px",
    color: "White",
  },
  Hero1: {
    display: "Flex",
    justifyContent: "Center",
    paddingTop: "20px",
  },
  Hero2: {
    paddingRight: "85px",
    paddingTop: "10px",
  },
  img: {
    width: "526px",
    height: "211px",
  },
};

function Hero() {
  return (
    <div>
      <div style={styles.Header}>
        <div style={styles.Hero1}>
          <div style={styles.Hero2}>
            <p style={styles.P1}>Selamat Pagi, Ticket Seekers !</p>
            <p style={styles.P2}>
              Ingin Pulkam dengan Good Deal ?<br></br>
              Masuk atau Daftar Sekarang !!
            </p>
          </div>
          <img src={Iklan} alt="iklan" style={styles.img}></img>
        </div>
      </div>
    </div>
  );
}

export default Hero;
