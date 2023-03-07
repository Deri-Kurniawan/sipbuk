import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const navLinks = [
  {
    label: "Beranda",
    path: "/",
  },
  {
    label: "Konsultasi",
    path: "/consult",
  },
  {
    label: "Tentang",
    path: "/about",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50">
      <div className="max-h-[76px] h-full bg-white py-2">
        {/* brand */}
        <div className="flex flex-row justify-between items-center px-[20px] lg:px-[119px] w-full">
          <Link
            href="/"
            className="relative transition-colors duration-300 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text hover:from-green-400 hover:to-green-400 hover:transition-transform hover:duration-1000"
          >
            <h1 className="font-kodchasan font-bold text-4xl">SIPBUK</h1>
            <p className="font-kodchasan font-bold text-[10px]">
              Sistem Pakar Jambu Kristal
            </p>
          </Link>

          <div>
            {/* desktop navlink */}
            <div className="hidden lg:block">
              {navLinks.map((nl, index) => (
                <Link
                  className={`${
                    index === navLinks.length ? "" : "mr-[38px]"
                  } text-base`}
                  key={index}
                  href={nl.path}
                >
                  {nl.label}
                </Link>
              ))}
              <Link
                className="btn btn-outline btn-success text-base capitalize w-24"
                href="/login"
              >
                Masuk
              </Link>
            </div>

            {/* mobile navlink */}
            <div className="relative lg:hidden">
              <div className="dropdown dropdown-bottom dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-outline btn-success m-1 text-white"
                >
                  <RxHamburgerMenu />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {navLinks.map((nl, index) => (
                    <li key={index}>
                      <Link href={nl.path}>{nl.label}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/login">Masuk</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
