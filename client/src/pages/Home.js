import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import { setAuthToken } from "../config/api";

const styles = {
  Body: {
    backgroundImage: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    minHeight: "100vh",
  },
};

function Home() {
  return (
    <div style={styles.Body}>
      <Hero />
      <MainContent />
    </div>
  );
}

export default Home;
