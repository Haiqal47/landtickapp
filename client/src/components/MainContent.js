import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Kereta from "../assets/img/kereta.png";
import Form from "react-bootstrap/Form";
import Rounded from "../assets/img/Rounded.png";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import { duration } from "../func/duratiion";
import ModalLogin from "../modal/ModalLogin";
import ModalRegister from "../modal/ModalRegister";
import { UserContext } from "./context/UserContext";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/img/Arrow.png";

const styles = {
  body: {
    backgroundColor: "#FFFFFF",
  },
  body2: {
    backgroundColor: "#FFFFFF",
    borderRadius: "0px 10px 10px 0px",
  },
  rectangle: {
    height: "53px",
    width: "9px",
    backgroundColor: "#E67E22",
  },
  krt1: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "10px",
    borderColor: "#000000",
    border: "5px",
    marginLeft: "120px",
    backgroundColor: "#F2F2F2",
    position: "absolute",
    top: "320px",
    width: "1060px",
    height: "190px",
    boxShadow: "0px 5px 5px 0px grey",
  },
  krt2: {
    paddingTop: "15px",
  },
  img: {
    width: "30px",
    height: "30px",
    margin: "0px 10px 0px 10px",
  },
  text: {
    fontSize: "18px",
    fontFamily: "Avenir",
    paddingRight: "80px",
  },
  krt3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  cb: {
    fontWeight: "bold",
  },
  text2: {
    fontWeight: "bold",
    paddingBottom: "5px",
  },
  krt4: {
    display: "flex",
    justifyContent: "center",
    width: "800px",
  },
  rounded: {
    width: "37px",
    height: "37px",
    margin: "23px 10px 0px 10px",
  },
  krt5: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  dropdown: {
    width: "30%",
  },
  dropdown2: {
    backgroundColor: "#0000",
  },
  text4: {
    textAlign: "center",
  },
  krt6: {
    width: "100%",
  },
  krt7: {
    width: "44%",
  },
  text3: {
    paddingTop: "5px",
    paddingLeft: "20px",
    fontSize: "20px",
  },
  button: {
    width: "33%",
    backgroundImage: "linear-gradient(to right, #EC7AB7, #EC7A7A)",
    borderColor: "#0000",
    marginTop: "27px",
    borderRadius: "5px",
    color: "white",
  },
  info: {
    paddingTop: "200px",
    paddingBottom: "50px",
  },
  text5: {
    paddingRight: "55px",
    paddingLeft: "50px",
  },
  text7: {
    paddingRight: "55px",
  },
  text6: {
    paddingLeft: "140px",
    paddingRight: "100px",
  },
  binfo: {
    display: "flex",
    justifyContent: "center",
  },
  body21: {
    display: "flex",
    justifyContent: "center",
    border: "2px groove",
    borderRadius: "5px",
    margin: "20px 120px 20px 120px",
    padding: "20px 0px 20px 0px",
    cursor: "pointer",
  },
  textt: {
    paddingRight: "50px",
    paddingLeft: "50px",
    fontWeight: "bold",
  },
  text21: {
    paddingRight: "100px",
    paddingLeft: "125px",
  },
  text31: {
    fontWeight: "100",
  },
  img2: {
    width: "20px",
    height: "20px",
    marginTop: "20px",
  },
};

function MainContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const myTicket = () => navigate("/myticket");

  const { data: station } = useQuery("stationCache", async () => {
    try {
      const response = await API.get("/stations");
      return response.data.data.users;
    } catch (error) {
      console.log(error);
    }
  });

  let { data: tickets } = useQuery("/ticketCache", async () => {
    const response = search
      ? await API.get(
          `/ticket?start_station_id=${form.start_station_id}&destination_station_id=${form.destination_station_id}`
        )
      : await API.get("/tickets");
    console.log("ini log response", response);
    return response.data.data;
  });

  const convertRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  console.log(tickets);

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  const buyTicket = useMutation(async (id) => {
    try {
      if (state.isLogin) {
        console.log("ini jalan");
        let form = new FormData();
        form.set("ticket_id", id);
        const response = await API.post("/transaction", form, config);
        handleShowDetail(true);
        return response.data.data;
      } else {
        setShowLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const [form, setForm] = useState({
    start_station_id: "",
    destination_station_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [search, setSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    form.start_station_id === "" && form.destination_station_id === ""
      ? setSearch(false)
      : setSearch(true);
  };

  return (
    <div style={styles.body}>
      <div style={styles.krt1}>
        <div style={styles.krt2}>
          <div style={styles.krt3}>
            <div style={styles.rectangle}></div>
            <img src={Kereta} alt="kereta" style={styles.img}></img>
            <div style={styles.text}>Tiket Kereta Api</div>
          </div>
        </div>
        <div style={styles.body2}>
          <div style={styles.text3}>Tiket Kereta Api</div>
          <div style={styles.krt4}>
            <div style={styles.krt7}>
              <div>
                <div style={styles.text2}>Asal</div>
                <select
                  onChange={handleChange}
                  value={form.start_station_id}
                  name="start_station_id"
                  className="w-100"
                >
                  <option value="" hidden>
                    Stasiun Keberangkatan
                  </option>
                  {station &&
                    station.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div style={styles.krt5}>
                <div>
                  <div style={styles.text2}>Tanggal Berangkat</div>
                  <Form.Control type="date" placeholder="DD-MM-YY" />
                </div>
                <Form.Check
                  type="checkbox"
                  label="Pulang Pergi"
                  style={styles.cb}
                />
              </div>
            </div>
            <img src={Rounded} alt="Rounded" style={styles.rounded}></img>
            <div style={styles.krt7}>
              <div style={styles.krt6}>
                <div style={styles.text2}>Tujuan</div>
                <select
                  onChange={handleChange}
                  value={form.destination_station_id}
                  name="destination_station_id"
                  className="w-100"
                >
                  <option value="" hidden>
                    Stasiun Tujuan
                  </option>
                  {station &&
                    station.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div style={styles.krt5}>
                <div style={styles.dropdown}>
                  <div style={styles.text2}>Dewasa</div>
                  <Form.Control
                    type="number"
                    min="0"
                    aria-label="Default select example"
                  ></Form.Control>
                </div>
                <div style={styles.dropdown}>
                  <div style={styles.text2}>Bayi</div>
                  <Form.Control
                    type="number"
                    min="0"
                    aria-label="Default select example"
                  ></Form.Control>
                </div>
                <button onClick={handleSearch} style={styles.button}>
                  Cari Tiket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.info}>
        <div>
          <div style={styles.binfo}>
            <div style={styles.text5}>Nama Kereta</div>
            <div className="mx-4 px-4">Berangkat</div>
            <div style={styles.text7} className="mx-5">
              Tiba
            </div>
            <div className="mx-4">Durasi</div>
            <div style={styles.text6}>Harga Per Orang</div>
          </div>
          {tickets?.map((e) => {
            return (
              <div>
                <div
                  onClick={() => {
                    return buyTicket.mutate(e.id);
                  }}
                  key={e.id}
                  style={styles.body21}
                >
                  <div style={styles.textt}>
                    <div>{e.name_train}</div>
                    <div style={styles.text31}>{e.type_train}</div>
                  </div>
                  <div style={styles.textt}>
                    <div>{e.start_time}</div>
                    <div style={styles.text31}>{e.start_station?.name}</div>
                  </div>
                  <img src={Arrow} alt="arrow" style={styles.img2}></img>
                  <div style={styles.textt}>
                    <div>{e.arrival_time}</div>
                    <div style={styles.text31}>{e.destination?.name}</div>
                  </div>
                  <div style={styles.textt}>
                    {duration(e.arrival_time, e.start_time)}
                  </div>
                  <div style={styles.text21} className="text-danger">
                    {convertRupiah(e.price)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal size="lg" show={showDetail} onHide={handleCloseDetail}>
        <Modal.Body className="text-center">
          <div>
            <div>
              Tiket anda berhasil ditambahkan silakan segera melakukan
              pembayaran
              <div>
                Klik{" "}
                <span style={{ cursor: "pointer" }} onClick={myTicket}>
                  Disini
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ModalLogin show={showLogin}></ModalLogin>
      <ModalRegister></ModalRegister>
    </div>
  );
}

export default MainContent;
