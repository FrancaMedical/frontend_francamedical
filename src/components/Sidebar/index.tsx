import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeContext from "@/contexts/ThemeContext";
import { MdAppRegistration, MdCalendarToday } from "react-icons/md";
import { BiFileFind } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="bg-blueMain dark:bg-dark min-h-screen h-full  fixed left-0">
      <div className="mt-44 h-full">
        <ul className="w-24 h-full px-2 ">
          <Link href="/QueryList">
            <li
              className={
                router.pathname == "/QueryList"
                  ? "cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited dark:bg-darkSecondary py-2 active"
                  : "cursor-pointer mb-12 flex flex-col items-center py-2 "
              }
            >
              <BiFileFind
                className={`text-5xl dark:text-white ${
                  router.pathname == "/QueryList"
                    ? "  text-blueTypography rounded-full"
                    : "text-white "
                }`}
              />
            </li>
          </Link>
          <Link href="/Schedule">
            <li
              className={
                router.pathname == "/Schedule"
                  ? "cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited dark:bg-darkSecondary py-2 active"
                  : "cursor-pointer mb-12 flex flex-col items-center py-2 "
              }
            >
              <MdCalendarToday
                className={`text-5xl dark:text-white ${
                  router.pathname == "/Schedule"
                    ? "  text-blueTypography "
                    : "text-white "
                }`}
              />
            </li>
          </Link>
          <Link href="/Register">
            <li
              className={
                router.pathname == "/Register"
                  ? "cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited dark:bg-darkSecondary py-2 active"
                  : "cursor-pointer mb-12 flex flex-col items-center py-2 "
              }
            >
              <MdAppRegistration
                className={`text-5xl dark:text-white ${
                  router.pathname == "/Register"
                    ? "  text-blueTypography "
                    : "text-white "
                }`}
              />
            </li>
          </Link>
          <Link href="/Settings">
            <li
              className={
                router.pathname == "/Settings"
                  ? "cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited dark:bg-darkSecondary py-2 active"
                  : "cursor-pointer mb-12 flex flex-col items-center py-2 "
              }
            >
              <IoMdSettings
                className={`text-5xl dark:text-white ${
                  router.pathname == "/Settings"
                    ? "  text-blueTypography "
                    : "text-white "
                }`}
              />
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
