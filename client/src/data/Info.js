import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Arrow from "../assets/img/Arrow.png";

const styles = {
  body: {
    display: "flex",
    justifyContent: "center",
    border: "2px groove",
    borderRadius: "5px",
    margin: "20px 120px 20px 120px",
    padding: "20px 0px 20px 0px",
    cursor: "pointer",
  },
  text: {
    paddingRight: "50px",
    paddingLeft: "50px",
    fontWeight: "bold",
  },
  text2: {
    paddingRight: "100px",
    paddingLeft: "125px",
  },
  text3: {
    fontWeight: "100",
  },
  img: {
    width: "20px",
    height: "20px",
    marginTop: "20px",
  },
};

function Info(props) {
  return (
    <div key={props.id} style={styles.body}>
      <div style={styles.text}>
        <div>{props.trainName}</div>
        <div style={styles.text3}>{props.class}</div>
      </div>
      <div style={styles.text}>
        <div>{props.startTime}</div>
        <div style={styles.text3}>{props.startStation}</div>
      </div>
      <img src={Arrow} alt="arrow" style={styles.img}></img>
      <div style={styles.text}>
        <div>{props.endTime}</div>
        <div style={styles.text3}>{props.destinationStation}</div>
      </div>
      <div style={styles.text}>{props.duration}</div>
      <div style={styles.text2} className="text-danger">
        {props.price}
      </div>
    </div>
  );
}

export default Info;
