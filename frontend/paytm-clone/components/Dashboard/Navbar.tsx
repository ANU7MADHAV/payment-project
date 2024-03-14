"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
};

const Navbar = () => {
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/v1/user/details",
            {
              headers: { Authorization: token },
            },
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <div className="flex justify-between px-4 py-4">
        <h1 className="text-2xl font-bold">Payments App</h1>
        <div>
          <p>Hello {userData ? userData.firstName : "loading"}</p>
        </div>
      </div>
      <div className="h-0.5 bg-gray-200"></div>
    </>
  );
};

export default Navbar;
