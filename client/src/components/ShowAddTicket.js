import React, { useEffect, useState } from "react";
import cssAT from "../css/AT.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";

function ShowAddTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name_train: "",
    type_train: "",
    start_date: "",
    start_station_id: "",
    start_time: "",
    destination_station_id: "",
    arrival_time: "",
    price: "",
    qty: "",
  });

  const { data: station } = useQuery("stationCache", async () => {
    try {
      const response = await API.get("/stations");
      return response.data.data.users;
    } catch (error) {
      console.log(error);
    }
  });

  console.log("ini station : ", station);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("name_train", form.name_train);
      formData.set("type_train", form.type_train);
      formData.set("start_date", form.start_date);
      formData.set("start_station_id", form.start_station_id);
      formData.set("start_time", form.start_time);
      formData.set("destination_station_id", form.destination_station_id);
      formData.set("arrival_time", form.arrival_time);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      const response = await API.post("/ticket", formData);

      navigate("/");
    } catch (error) {
      console.log(form);
      console.log(error);
    }
  });

  return (
    <div className={cssAT.head}>
      <div className={cssAT.form}>
        <h2 className="mb-4">Tambah Tiket</h2>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div>
            <input
              onChange={handleChange}
              value={form.name_train}
              name="name_train"
              className="w-100 p-1 px-2"
              type="text"
              placeholder="Nama Kereta"
            />
          </div>
          <select
            onChange={handleChange}
            value={form.type_train}
            name="type_train"
            style={{
              width: "100%",
              padding: "5px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <option hidden className="w-100 my-3">
              Jenis Kereta
            </option>
            <option className="w-100 my-3">Ekonomi</option>
            <option className="w-100 my-3">Eksekutif</option>
            <option className="w-100 my-3">Premium</option>
            <option className="w-100 my-3">Bisnis</option>
          </select>
          <div>
            <input
              onChange={handleChange}
              value={form.start_date}
              id="start_date"
              name="start_date"
              className="w-100 p-1 px-2"
              type="date"
            />
          </div>
          <select
            onChange={handleChange}
            value={form.start_station_id}
            name="start_station_id"
            className="w-100 my-3 p-1 px-2"
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
          <div>
            <input
              onChange={handleChange}
              value={form.start_time}
              name="start_time"
              className="w-100 p-1 px-2"
              type="time"
              placeholder="Jam Keberangkatan"
            />
          </div>
          <select
            onChange={handleChange}
            value={form.destination_station_id}
            name="destination_station_id"
            className="w-100 my-3 p-1 px-2"
          >
            <option hidden>Stasiun Tujuan</option>
            {station &&
              station.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))}
          </select>
          <div>
            <input
              onChange={handleChange}
              value={form.arrival_time}
              name="arrival_time"
              className="w-100 p-1 px-2"
              type="time"
              placeholder="Jam Tiba"
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              value={form.price}
              name="price"
              className="w-100 my-3 p-1 px-2"
              type="number"
              placeholder="Harga Tiket"
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              value={form.qty}
              name="qty"
              className="w-100 p-1 px-2"
              type="number"
              placeholder="Qty"
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="dark"
              type="submit"
              className="my-3 d-flex justify-content-end"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowAddTicket;
