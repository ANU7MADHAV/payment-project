"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SendMoney = () => {
  const searchParams = useSearchParams();
  const to = searchParams.get("id");

  const [amount, setAmount] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  console.log(amount);
  const handleClick = () => {
    const sendMoney = async () => {
      try {
        if (amount === "") {
          return null;
        }
        const token = localStorage.getItem("jwtToken");
        const res = await axios.post(
          "http://localhost:3000/api/v1/account/transfer",
          {
            to,
            amount,
          },
          {
            headers: { Authorization: token },
          },
        );
        const data = res.data;
        console.log(data.message);
        alert(data.message);
      } catch (error) {
        console.log(error);
      }
    };
    sendMoney();
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex min-h-[350px]  min-w-[350px] flex-col items-center justify-center rounded-md shadow-lg">
        <div>
          <h1 className="mb-14 text-2xl font-extrabold">Send Money</h1>
        </div>
        <div className="flex w-full flex-col space-y-2 px-4">
          <section className="flex items-center  space-x-3">
            <p>User</p>
            <h3 className="text-xl font-bold">Friend&apos;s name</h3>
          </section>
          <p className="">Amount in (in rs)</p>
          <input
            onChange={handleChange}
            type="text"
            placeholder="amount .."
            className="w-full rounded-md border border-gray-400 px-2  outline-lime-500 "
          />
          <button
            onClick={() => handleClick()}
            className="rounded-md bg-green-500 px-2 py-1 text-white"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
