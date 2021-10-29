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
      let timeoutId: any = null;
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
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-white">
      {/* Logo and title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="hidden text-2xl font-semibold lg:block">
          <Link href="/">readit</Link>
        </span>
      </div>
      {/* Search Input */}
      <div className="max-w-full px-4 w-160">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search "></i>
          <input
            type="text"
            className="py-1 pr-3 bg-transparent rounded focus:outline-none"
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
      </div>
      <div className="flex">
        {/* Auth buttons */}
        {!loading && authenticated ? (
          //logout button
          <button
            className="hidden w-20 py-1 mr-4 leading-5 sm:block lg:w-32 hollow blue button"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Fragment>
            <Link href="/login">
              <a className="hidden w-20 py-1 mr-4 leading-5 sm:block hollow blue button lg:w-32">
                log in
              </a>
            </Link>
            <Link href="/register">
              <a className="hidden w-20 py-1 leading-5 sm:block blue button lg:w-32">
                sign up
              </a>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Navbar;
