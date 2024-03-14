"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

axios.defaults.baseURL = "http://localhost:3000";

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (submitData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        submitData,
      );
      console.log("data", data);
      const { success, message } = data;
      if (success) {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-4 text-center">
      <div className=" rounded-md px-8 py-4 shadow-lg">
        <div className="my-5">
          <h3 className="my-3 text-3xl font-bold ">Sign up</h3>
          <p className="mb-4 text-gray-400">
            Enter more information to create account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 text-left"
        >
          <label>First Name</label>
          <input
            placeholder="john"
            {...register("firstName")}
            className="w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          />
          <label>LastName</label>
          <input
            placeholder="doe"
            {...register("lastName")}
            className="w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:border-indigo-500 focus:outline-none"
          />
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
          <h3>Already have account? </h3>{" "}
          <Link href="/signin" className="border-b-2 border-black/25 px-1">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
