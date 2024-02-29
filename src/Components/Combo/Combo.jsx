import axios from "axios";
import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";

export const Combo = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  async function getApi() {
    try {
      setIsPending(true);
      const req = await axios.get("http://localhost:3000/data?type=combo");
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
    <section id="combo">
      <div className="container">
        <h1 className="text-4xl font-bold my-10">Комбо</h1>
        {/* <div>{isPending ? "Loading" : ""}</div> */}
        <div>{error ? "Product not found!" : ""}</div>
        <Suspense fallback={<h1 className="text-4xl">Hello..</h1>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {data?.map((item, index) => (
              <div key={index}>
                <img src={item.img} alt="" />
                <h3>{item.title}</h3>
                <div className="flex justify-between items-center">
                  <p>{item.price} sum</p>
                  <Link
                    to={`/${item.id}`}
                    className="py-2 px-7 bg-orange-600 text-white rounded-3xl"
                  >
                    {item.bought ? "bought" : "buy"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
};
