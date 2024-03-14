"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Users from "./Users";
import { User } from "./Navbar";

type Balance = {
  balance: string | number;
};

const Searchbar = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState<Balance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.post(
            `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
            {},
            {
              headers: { Authorization: token },
            },
          );
          setUsers(response.data.user); // Assuming response data contains an array of users
        }
      } catch (error) {
        setError("Failed to fetch users. Please try again."); // Provide user feedback
      }
    };

    getUsers();
  }, [filter]);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/v1/account/balance",
            {
              headers: { Authorization: token },
            },
          );
          setBalance(response.data);
        }
      } catch (error) {
        setError("Failed to fetch balance. Please try again."); // Provide user feedback
      }
    };

    getBalance();
  }, []);

  const currentBalance = isNaN(Number(balance?.balance))
    ? "loading"
    : Math.round(Number(balance?.balance));

  return (
    <div>
      <div className="w-full px-4 py-4">
        <h1 className="text-xl font-bold">
          Your Balance $ {balance ? currentBalance : "loading"}
        </h1>
        <h1 className="px-1 pb-2 pt-4 text-xl font-bold">Users</h1>
        <div className="px-2">
          <input
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            type="search"
            placeholder="search users"
            className="w-full appearance-none rounded border border-gray-400 px-3 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message if error exists */}
      </div>
      <div className="mt-5">
        {users &&
          users.map((user, index) => (
            <Users index={index} key={user._id} user={user} />
          ))}
      </div>
    </div>
  );
};

export default Searchbar;
