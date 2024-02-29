import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Detail = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  async function getApi() {
    try {
      setIsPending(true);
      const req = await axios.get(`http://localhost:3000/data/${id}`);
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
    <>
      <section className="h-screen">
        <div className="container h-full">
          <div className="h-full items-center grid grid-cols-1 lg:grid-cols-2">
            <img src={data.img} alt="" />
            <div className="flex flex-col gap-5">
              <h3 className="text-4xl font-bold">{data.title}</h3>
              <p className="text-2xl font-semibold text-slate-500">
                {data.price} sum
              </p>
              <div className="flex gap-10">
                <div className="flex items-center  gap-5">
                  <button
                    onClick={() =>
                      data.amount > 1
                        ? setData({ ...data, amount: data.amount - 1 })
                        : false
                    }
                    className="py-2 px-4 text-white rounded-md bg-red-600"
                  >
                    -
                  </button>
                  <h3>{data.amount}</h3>
                  <button
                    onClick={() =>
                      setData({ ...data, amount: data.amount + 1 })
                    }
                    className="py-2 px-4 text-white rounded-md bg-green-600"
                  >
                    +
                  </button>
                </div>
                {data.bought ? (
                  ""
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        const existingData = (
                          await axios.get("http://localhost:3000/basket")
                        ).data;
                        const exists = existingData.find(
                          (item) => item.id === data.id
                        );
                        if (!exists) {
                          await axios.post("http://localhost:3000/basket", {
                            ...data,
                            bought: true,
                          });
                        }
                      } catch (error) {
                        console.error("Error while buying:", error);
                      }
                      navigate("/");
                    }}
                    className="py-2 px-7 bg-blue-600 text-white rounded-3xl"
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
