import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pizza = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  async function getApi() {
    try {
      setIsPending(true);
      const req = await axios.get("http://localhost:3000/data?type=pizza");
      const res = await req.data;
      setData(res);
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(true);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <section id="pizza">
      <div className="container">
        <h1 className="text-4xl font-bold my-10">Пицца</h1>
        <div>{isPending ? "Loading" : ""}</div>
        <div>{error ? "Product not found!" : ""}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {data?.map((item, index) => (
            <div key={index}>
              <img src={item.img} alt="" />
              <h3>{item.title}</h3>
              <div className="flex justify-between items-center">
                <p>{item.price} sum</p>
                <Link to={`/${item.id}`} className="py-2 px-7 bg-orange-600 text-white rounded-3xl">
                  Buy
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
