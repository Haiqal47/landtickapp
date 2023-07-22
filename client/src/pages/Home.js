import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";

const styles = {
  Body: {
    backgroundImage: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    height: "150vh",
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
