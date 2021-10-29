/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RedditLogo from "../images/reddit.svg";
import { useAuthDispatch, useAuthState } from "../context/auth";
import axios from "axios";
import { Sub } from "../types";
import router from "next/router";

const Navbar: React.FC = () => {
  const [name, setName] = useState("");

  const [timer, setTimer] = useState();

  const [subs, setSubs] = useState<Sub[]>([]);

  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    axios
      .get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (name.trim() === "") {
      setSubs([]);
      return;
    }
    const searchSubs = async () => {
      clearTimeout(timer);
      let timeoutId: null | ReturnType<typeof setTimeout> = null;
      timeoutId = setTimeout(async () => {
        try {
          const { data } = await axios.get(`/subs/search/${name}`);
          setSubs(data);
        } catch (error) {
          console.log(error);
        }
      }, 250);
      setTimer(timeoutId);
    };
    searchSubs();
  }, [name]);

  const goToSub = (sub) => {
    router.push(`/r/${sub}`);
    setName("");
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
      {/* Logo and title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">readit</Link>
        </span>
      </div>
      {/* Search Input */}
      <div className="relative flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
        <i className="pl-4 pr-3 text-gray-500 fas fa-search "></i>
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
          placeholder="Search"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          className="absolute left-0 right-0 bg-white "
          style={{
            top: "100%",
          }}
        >
          {subs?.map((sub) => (
            <div
              className="flex items-center px-4 py-3 cursor-pointer"
              key={sub.name}
              onClick={() => goToSub(sub.name)}
            >
              <Image
                src={sub.imageUrl}
                alt="Sub"
                className="rounded-full "
                height={(8 * 16) / 4}
                width={(8 * 16) / 4}
              />
              <div className="ml-4 text-sm">
                <div className="font-medium">{sub.name}</div>
                <p className="text-gray-600">{sub.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        {/* Auth buttons */}
        {!loading && authenticated ? (
          //logout button
          <button
            className="w-32 py-1 mr-4 leading-5 hollow blue button"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Fragment>
            <Link href="/login">
              <a className="w-32 py-1 mr-4 leading-5 hollow blue button">
                log in
              </a>
            </Link>
            <Link href="/register">
              <a className="w-32 py-1 leading-5 blue button">sign up</a>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Navbar;
