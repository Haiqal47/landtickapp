import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import landtickp from "../assets/img/landtickp.png";
import trainp from "../assets/img/trainp.png";
import cssSP from "../css/SP.module.css";
import qr from "../assets/img/qr.png";
import cssModule from "../css/MT.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";

function ShowPayment() {
  const navigate = useNavigate();

  let param = useParams();
  let id = parseInt(param.id);

  let { data: myTicket } = useQuery("myTicketCache2", async () => {
    const response = await API.get(`/transaction/${id}`);
    console.log(response);
    return response.data.data;
  });
  const convertRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBuy = useMutation(async () => {
    try {
      const form = {
        id: myTicket.id,
        fullname: myTicket.User.name,
        email: myTicket.User.email,
        price: myTicket.Ticket.price,
      };

      const response = await API.post(`/payment`, form);
      console.log("transaction success :", response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/myticket");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/myticket");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/myticket");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  // const berhasilPayment = () => navigate("/myticket");
  return (
    <div className="pt-5 mt-5">
      <Container>
        <h3 className="pt-5 ps-3">Invoice</h3>
        <Row>
          <Col md={8}>
            <div className="border border-2 rounded ms-3 my-4">
              <div className={cssSP.nav}>
                <img src={landtickp} alt="landtickp" />
                <img src={trainp} alt="trainp" />
              </div>
              <div>
                <ul className="d-flex" style={{ listStyle: "none" }}>
                  <li className="me-5">No. Tanda Pengenal</li>
                  <li className="me-5">Nama Pemesan</li>
                  <li className="me-5">No. Handphone</li>
                  <li className="me-5">Email</li>
                </ul>
                <hr />
                <ul className="d-flex opacity-50" style={{ listStyle: "none" }}>
                  <li className="me-5 pe-2">311798715292629</li>
                  <li className="me-5 pe-5">{myTicket?.User?.name}</li>
                  <li className="me-5 ps-4 ms-2">{myTicket?.User?.no_hp}</li>
                  <li className="me-5 ms-2">{myTicket?.User?.email}</li>
                </ul>
              </div>
            </div>
            <div className="ms-3" style={{ width: 400 }}>
              <h2>Rincian Harga</h2>
              <div className="border border-2 p-0 rounded mt-4">
                <ul
                  className="d-flex justify-content-between pt-3 pe-3 ps-3"
                  style={{ listStyle: "none" }}
                >
                  <li>{myTicket?.Ticket?.name_train} (Dewasa) x 1</li>
                  <li>{convertRupiah(myTicket?.Ticket?.price)}</li>
                </ul>
                <ul
                  className="d-flex justify-content-between m-0 pe-3 ps-3"
                  style={{ listStyle: "none", backgroundColor: "#E6E7E7" }}
                >
                  <li style={{ fontSize: 18 }}>Total</li>
                  <li className="fw-bold" style={{ fontSize: 18 }}>
                    {convertRupiah(myTicket?.Ticket?.price)}
                  </li>
                </ul>
              </div>
              <button
                onClick={(e) => handleBuy.mutate(e)}
                className={cssSP.btn}
              >
                Bayar Sekarang
              </button>
            </div>
          </Col>
          <Col md={4}>
            <div className="border border-2 rounded p-0">
              <div className="d-flex" style={{ backgroundColor: "#D1D1D0" }}>
                <div className="py-3  ps-2">
                  <h2>Kereta Api</h2>
                  <p>
                    Saturday
                    <span className="opacity-50">, 21 Februari 2023</span>
                  </p>
                </div>
                <div className="p-2 m-2 ms-4 text-center">
                  <img src={qr} alt="qr"></img>
                  <div>INV0101</div>
                </div>
              </div>
              <div style={{ backgroundColor: "#E6E7E7" }}>
                <div className="p-2">
                  <h2>{myTicket?.Ticket?.name_train}</h2>
                  <div>{myTicket?.Ticket?.type_train}</div>
                </div>
                <div className="d-flex">
                  <div className="p-3">
                    <div className={cssModule.rounded}></div>
                    <div className={cssModule.vertical}>
                      <hr />
                    </div>
                    <div className={cssModule.rounded2}></div>
                  </div>
                  <div className="d-flex pb-3">
                    <div>
                      <div className="pb-4 mb-2">
                        <div className={cssModule.text4}>
                          {myTicket?.Ticket?.start_time}
                        </div>
                        <div className={cssModule.text5}>
                          {myTicket?.Ticket?.start_date}
                        </div>
                      </div>
                      <div className={cssModule.text4}>
                        {myTicket?.Ticket?.arrival_time}
                      </div>
                      <div className={cssModule.text5}>
                        {myTicket?.Ticket?.start_date}
                      </div>
                    </div>
                    <div className={cssModule.divtgl3}>
                      <div className="pb-4 mb-2">
                        <div className={cssModule.text4}>
                          {myTicket?.Ticket?.start_station?.name}
                        </div>
                        <div className={cssModule.text5}>Stasiun Gambir</div>
                      </div>
                      <div className={cssModule.text4}>
                        {myTicket?.Ticket?.destination?.name}
                      </div>
                      <div className={cssModule.text5}>Stasiun Surabaya</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShowPayment;
