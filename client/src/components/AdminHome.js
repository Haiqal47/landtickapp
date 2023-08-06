import React, { useEffect, useState } from "react";
import cssAH from "../css/AH.module.css";
import search from "../assets/img/search.png";
import edit from "../assets/img/edit.png";
import trash from "../assets/img/trash.png";
import { FormControl, Modal, ModalBody, Tab, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import cssModule from "../css/MT.module.css";
import landtickp from "../assets/img/landtickp.png";
import trainp from "../assets/img/trainp.png";
import qr from "../assets/img/qr.png";
import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  setAuthToken(localStorage.token);

  const convertRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  let { data: listTransaction, refetch } = useQuery(
    "allTransactionCache",
    async () => {
      const response = await API.get("/transactions");

      return response.data.data.transaction;
    }
  );

  console.log(listTransaction);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [detailInvoice, setDetailInvoice] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
    console.log("delete id", deleteId);
    setOpen3(true);
  };

  const handleDetailInvoice = (data) => {
    setDetailInvoice(data);
    setOpen2(true);
  };

  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/transaction/${id}`);
      console.log(response);
      refetch();
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  });

  const handleDeleteId = () => {
    setDeleteConfirm(true);
  };

  useEffect(() => {
    if (deleteConfirm) {
      deleteById.mutate(deleteId);
      setDeleteConfirm(null);
      setOpen3(false);
    }
  }, [deleteConfirm]);

  console.log("list transaction", listTransaction);
  return (
    <div className={cssAH.head}>
      <h2 className="mb-4">List Transaksi</h2>
      <Table>
        <thead>
          <tr className={cssAH.div}>
            <th className="me-5">No</th>
            <th className="me-5">Users</th>
            <th className="mx-5 px-5">Tiket</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <hr />
        {listTransaction?.map((data, index) => {
          return (
            <tbody>
              <tr className={cssAH.div}>
                <td>{index + 1}</td>
                <td>{data.user?.name}</td>
                <td>
                  {data.ticket.start_station?.name} -{" "}
                  {data.ticket.destination?.name}
                </td>
                <td>
                  {data.status === "pending" && (
                    <td className="text-warning">{data.status}</td>
                  )}
                  {data.status === "approved" && (
                    <td className="text-success">{data.status}</td>
                  )}
                  {data.status === "cancel" && (
                    <td className="text-danger">{data.status}</td>
                  )}
                </td>
                <td>
                  <img
                    onClick={() => handleDetailInvoice(data)}
                    style={{ cursor: "pointer" }}
                    src={search}
                    alt="search"
                  />
                  <img
                    onClick={() => handleDelete(data.id)}
                    style={{ cursor: "pointer" }}
                    src={trash}
                    alt="trash"
                  />
                </td>
              </tr>
              <hr />
            </tbody>
          );
        })}
      </Table>
      {open2 && (
        <Modal show={open2} data={detailInvoice}>
          <Modal.Body>
            <div>
              <div className="d-flex justify-content-between">
                <div className={cssModule.nav}>
                  <img src={landtickp} alt="landtickp" />
                  <img src={trainp} alt="trainp" className="px-2" />
                </div>
                <button
                  onClick={() => setOpen2(false)}
                  className="border-0 bg-white text-danger p-0"
                  style={{ fontSize: 30, fontWeight: "bold" }}
                >
                  X
                </button>
              </div>
              <div className="ps-3 ms-1 ">
                <h3 className="m-0 pt-1">Invoice</h3>
                <div className="opacity-50">Kode Invoice : INV0101</div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between px-5 pb-2">
                  <div>
                    <h5 className="m-0">Kereta Api</h5>
                    <div style={{ fontSize: 13 }}>
                      <span style={{ fontWeight: "bold" }}>Saturday</span>, 21
                      Februari 2020
                    </div>
                    <div className="pt-3">
                      <h5 className="m-0">{detailInvoice.ticket.name_train}</h5>
                      <div style={{ fontSize: 13 }}>
                        {detailInvoice.ticket.type_train}
                      </div>
                    </div>
                  </div>
                  <div>
                    <img src={qr} alt="qr"></img>
                    <div className="mx-3 pt-2">TCK0101</div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="p-3">
                    <div className={cssModule.rounded}></div>
                    <div className={cssModule.vertical}>
                      <hr />
                    </div>
                    <div className={cssModule.rounded2}></div>
                  </div>
                  <div className="ms-2 px-4">
                    <div className="p-0 pb-4 mb-2">
                      <div className={cssModule.text4}>
                        {detailInvoice.ticket.start_time}
                      </div>
                      <div className={cssModule.text5}>
                        {detailInvoice.ticket.start_date}
                      </div>
                    </div>
                    <div className={cssModule.text4}>
                      {detailInvoice.ticket.arrival_time}
                    </div>
                    <div className={cssModule.text5}>
                      {detailInvoice.ticket.start_date}
                    </div>
                  </div>
                  <div className="p-0 px-4">
                    <div className="pb-4 mb-2">
                      <div className={cssModule.text4}>
                        {detailInvoice.ticket.start_station.name}
                      </div>
                      <div className={cssModule.text5}>
                        Stasiun {detailInvoice.ticket.start_station.name}
                      </div>
                    </div>
                    <div className={cssModule.text4}>
                      {detailInvoice.ticket.destination.name}
                    </div>
                    <div className={cssModule.text5}>
                      Stasiun {detailInvoice.ticket.destination.name}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <hr />
                <div>
                  <div className="d-flex" style={{ fontSize: 12 }}>
                    <div className="me-4">No. Tanda Pengenal</div>
                    <div className="me-4">Nama Pemesan</div>
                    <div className="me-4 pe-3">No. Handphone</div>
                    <div className="me-3">Email</div>
                  </div>
                  <hr />
                  <div className="d-flex" style={{ fontSize: 12 }}>
                    <div className="me-3">31175033003970001</div>
                    <div className="me-5 ms-1">{detailInvoice.user.name}</div>
                    <div className="me-5 ms-4 ps-2">
                      {detailInvoice.user.no_hp}
                    </div>
                    <div className="me-3">{detailInvoice.user.email}</div>
                  </div>
                  <hr />
                  <div
                    className="d-flex justify-content-between px-3 py-2"
                    style={{ backgroundColor: "#E6E6E6" }}
                  >
                    <h4>Total</h4>
                    <h4 className="text-danger">
                      {convertRupiah(detailInvoice.ticket.price)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {open3 && (
        <Modal show={open3}>
          <Modal.Body>
            <div>
              <div>Delete Transaction</div>
              <div>Are you sure to delete this Transaction?</div>
              <div>
                <Button onClick={handleDeleteId}>Yes, Delete</Button>
                <Button onClick={() => setOpen3(false)}>No</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default AdminHome;
