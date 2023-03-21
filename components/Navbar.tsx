"use client";

import Link from "next/link";
// @ts-ignore
import { usePathname } from "next/navigation";
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

interface Props {
  isSticky?: boolean;
}

export default function Navbar({ isSticky = true }: Props) {
  const pathname = usePathname();

  return (
    <nav className={`${isSticky ? "sticky top-0" : ""} z-50`}>
      <div className="max-h-[76px] h-full bg-white py-2">
        {/* brand */}
        <div className="flex flex-row items-center justify-between w-full safe-horizontal-padding">
          <Link
            href="/"
            className="relative text-transparent transition-colors duration-300 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text hover:from-green-400 hover:to-green-400 hover:transition-transform hover:duration-1000"
          >
            <h1 className="text-4xl font-bold font-kodchasan">SIPBUK</h1>
            <p className="font-kodchasan font-bold text-[10px]">
              Sistem Pakar Jambu Kristal
            </p>
          </Link>

          <div>
            {/* desktop navlink */}
            <div className="hidden lg:block">
              {navLinks.map((nl, index) => (
                <Link
                  className={`${index === navLinks.length ? "" : "mr-[38px]"} ${pathname === nl.path ? "font-semibold" : ""
                    } text-base`}
                  key={index}
                  href={nl.path}
                >
                  {nl.label}
                </Link>
              ))}
              <Link
                className="w-24 text-base capitalize btn btn-outline btn-success"
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
                  className="m-1 text-white btn btn-outline btn-success"
                >
                  <RxHamburgerMenu />
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
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
