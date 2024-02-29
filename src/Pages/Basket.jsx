import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Basket = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  async function getApi() {
    try {
      setIsPending(true);
      const req = await axios.get("http://localhost:3000/basket");
      const res = await req.data;
      setData(res);
      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(true);
    }
  }
  console.log(data);
  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <h1 className="text-4xl font-bold my-20">Basket</h1>
          <div>{isPending ? "Loading" : ""}</div>
          <div>{error ? "Product not found!" : ""}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {data?.map((item, index) => (
              <div key={index}>
                <img src={item.img} alt="" />
                <h3>{item.title}</h3>
                <div className="flex justify-between items-center">
                  <p>{item.price} sum</p>
                  <button
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:3000/basket/${item.id}`
                      );
                      setData(data.filter((i) => i.id !== item.id));
                    }}
                    className="py-2 px-7 bg-red-600 text-white rounded-3xl"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
