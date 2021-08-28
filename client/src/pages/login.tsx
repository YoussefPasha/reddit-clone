import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import InputGroup from "../components/InputGroup";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/auth/login", {
        password,
        username,
      });
      router.push("/");
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  return (
    <div className="flex">
      <Head>
        <title>Login</title>
      </Head>
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('/images/register.jpg')" }}
      />
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreemet and Privacy Ploicy
          </p>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              setValue={setUsername}
              placeholder={"USERNAME"}
              type="text"
              error={errors.username}
            />
            <InputGroup
              className="mb-2"
              value={password}
              setValue={setPassword}
              placeholder={"PASSWORD"}
              type="password"
              error={errors.password}
            />
            <button
              type="submit"
              className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded"
            >
              Login
            </button>
            <small>
              New to Readit?
              <Link href="/register">
                <a className="ml-1 font-medium text-blue-500 uppercase">
                  Sign Up
                </a>
              </Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
