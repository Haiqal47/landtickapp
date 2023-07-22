import cssModule from "../css/MT.module.css";
import trainp from "../assets/img/trainp.png";
import landtickp from "../assets/img/landtickp.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import qr from "../assets/img/qr.png";
import Modal from "react-bootstrap/Modal";
import clock from "../assets/img/clock.png";
import pass from "../assets/img/pass.png";
import warning from "../assets/img/warning.png";
import { useQuery } from "react-query";
import { API } from "../config/api";

function MyTicket() {
  const navigate = useNavigate();

  // const berhasilPayment = () => navigate("/payment");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let { data: myTicket, refetch } = useQuery("myTicketCache", async () => {
    const response = await API.get("/transactionbyuser");
    return response.data.data;
  });

  useEffect(() => {
    refetch();
  }, []);

  console.log(myTicket);

  const buyTicket = async (id) => {
    try {
      const response = await API.get(`/transaction/${id}`);
      navigate(`/payment/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cssModule.header}>
      <div>
        <div className={cssModule.textutama}>Tiket Saya</div>
        {myTicket?.map((data, index) => (
          <div key={index} className={cssModule.hnav}>
            <div>
              <div className={cssModule.nav}>
                <img src={landtickp} alt="landtickp" />
                <img src={trainp} alt="trainp" className="px-2" />
              </div>
              <div className={cssModule.div}>
                <div className={cssModule.divargo}>
                  <div className={cssModule.text}>{data.ticket.name_train}</div>
                  <div className={cssModule.text2}>{data.type_train}</div>
                  <div className={cssModule.text3}>{data.status}</div>
                </div>
                <div className={cssModule.divr}>
                  <div className={cssModule.rounded}></div>
                  <div className={cssModule.vertical}>
                    <hr />
                  </div>
                  <div className={cssModule.rounded2}></div>
                </div>
                <div className={cssModule.divtgl}>
                  <div className={cssModule.divtgl2}>
                    <div className={cssModule.text4}>
                      {data.ticket.start_time}
                    </div>
                    <div className={cssModule.text5}>
                      {data.ticket.start_date}
                    </div>
                  </div>
                  <div className={cssModule.text4}>
                    {data.ticket.arrival_time}
                  </div>
                  <div className={cssModule.text5}>
                    {data.ticket.start_date}
                  </div>
                </div>
                <div className={cssModule.divtgl}>
                  <div className={cssModule.divtgl2}>
                    <div className={cssModule.text4}>
                      {data.ticket.start_station.name}
                    </div>
                    <div className={cssModule.text5}>
                      Stasiun {data.ticket.start_station.name}
                    </div>
                  </div>
                  <div className={cssModule.text4}>
                    {data.ticket.destination.name}
                  </div>
                  <div className={cssModule.text5}>
                    Stasiun {data.ticket.destination.name}
                  </div>
                </div>
              </div>
              <div>
                <div className={cssModule.divid}>
                  <div className={cssModule.text6}>No. Tanda Pengenal</div>
                  <div className={cssModule.text6}>Nama Pemesan</div>
                  <div className={cssModule.text7}>No. Handphone</div>
                  <div className={cssModule.text6}>Email</div>
                </div>
                <hr />
                <div className={cssModule.divid2}>
                  <div className="mx-4">31175033003970001</div>
                  <div className="mx-3">{data.user.name}</div>
                  <div className="mx-5 px-5">{data.user.no_hp}</div>
                  <div>{data.user.email}</div>
                </div>
              </div>
            </div>
            <div className={cssModule.divkrt}>
              <div className={cssModule.text8}>Kereta Api</div>
              <div style={{ fontSize: 14 }}>
                <span className={cssModule.text9}>Saturday</span>, 21 Februari
                2020
              </div>
              <div className={cssModule.btndiv}>
                <button
                  onClick={() => buyTicket(data.id)}
                  className={cssModule.btn}
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Body>
                <div>
                  <div className={cssModule.a}>
                    <div>
                      <div>E-Ticket</div>
                      <div>Kode Invoice : INV0101</div>
                    </div>
                    <div className={cssModule.navkanan}>
                      <img src={landtickp} alt="landtickp" />
                      <img src={trainp} alt="trainp" />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="pt-4">
                      <div className={cssModule.text9}>Kereta Api</div>
                      <div>
                        <span className={cssModule.text9}>Saturday</span>, 21
                        Februari 2020
                      </div>
                      <div>
                        <div className={cssModule.text}>
                          {data.ticket.name_train}
                        </div>
                        <div className={cssModule.text2}>{data.type_train}</div>
                      </div>
                      <div className="d-flex">
                        <div className={cssModule.divr}>
                          <div className={cssModule.rounded}></div>
                          <div className={cssModule.vertical}>
                            <hr />
                          </div>
                          <div className={cssModule.rounded2}></div>
                        </div>
                        <div className={cssModule.divtgl}>
                          <div className={cssModule.divtgl2}>
                            <div className={cssModule.text4}>
                              {data.ticket.start_time}
                            </div>
                            <div className={cssModule.text5}>
                              {data.ticket.start_date}
                            </div>
                          </div>
                          <div className={cssModule.text4}>
                            {data.ticket.arrival_time}
                          </div>
                          <div className={cssModule.text5}>
                            {data.ticket.start_date}
                          </div>
                        </div>
                        <div className={cssModule.divtgl}>
                          <div className={cssModule.divtgl2}>
                            <div className={cssModule.text4}>
                              {data.ticket.start_station.name}
                            </div>
                            <div className={cssModule.text5}>
                              Stasiun {data.ticket.start_station.name}
                            </div>
                          </div>
                          <div className={cssModule.text4}>
                            {data.ticket.destination.name}
                          </div>
                          <div className={cssModule.text5}>
                            Stasiun {data.ticket.destination.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div onClick={handleShowModal} className={cssModule.divv}>
                        <img src={qr} alt="qr"></img>
                        <div className="mx-3 pt-2">TCK0101</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <hr />
                    <div className="d-flex">
                      <div>
                        <img src={pass} alt="pass" />
                        <p>
                          Tunjukkan e-ticket dan identitas para penumpang saat
                          checkin
                        </p>
                      </div>
                      <div>
                        <img src={clock} alt="clock" />
                        <p>
                          Check-in paling lambat 90 menit sebelum keberangkatan{" "}
                        </p>
                      </div>
                      <div>
                        <img src={warning} alt="warning" />
                        <p>Waktu tertera adalah waktu stasiunsetempat </p>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className={cssModule.divid}>
                        <div className={cssModule.text6}>
                          No. Tanda Pengenal
                        </div>
                        <div className={cssModule.text6}>Nama Pemesan</div>
                        <div className={cssModule.text7}>No. Handphone</div>
                        <div className={cssModule.text6}>Email</div>
                      </div>
                      <hr />
                      <div className={cssModule.divid2}>
                        <div className="mx-4">31175033003970001</div>
                        <div className="mx-3">{data.user.name}</div>
                        <div className="mx-5 px-5">{data.user.no_hp}</div>
                        <div>{data.user.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTicket;
