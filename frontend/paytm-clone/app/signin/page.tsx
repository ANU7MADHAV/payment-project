"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { setTokenInCookie } from "../action";

interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

axios.defaults.baseURL = "http://localhost:3000";
const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    axios
      .post("http://localhost:3000/api/v1/user/signin", data)
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        router.push("/dashboard");
        setTokenInCookie();
      })
      .catch((error) => console.log(error));

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
      <div className=" rounded-md px-8 py-4 shadow-lg">
        <div className="my-5">
          <h3 className="my-3 text-3xl font-bold ">Sign In</h3>
          <p className="mb-4 text-gray-400">
            Enter your creditienls access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 text-left"
        >
          <label>Email</label>
          <input
            className="w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            {...register("username")}
          />
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="my-5 rounded-md bg-black px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center py-4">
          <h3>Don&apos;t have any account ? </h3>{" "}
          <Link href="/signup" className="border-b-2 border-black/25 px-1">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
