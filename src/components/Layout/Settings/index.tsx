import React, { useContext, useEffect, useState } from "react";
import ContentMain from "../../ContentMain";
import ThemeContext from "@/contexts/ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/Md";

const Settings = () => {
  const { dark, toggleDark } = useContext(ThemeContext);
  return (
    <ContentMain showHeader={true} title="Configuração">
      <div className="h-full bg-blueLight dark:bg-dark3 rounded-b-md min-h-screen">
        <div className="flex items-center ml-12 pt-12">
          <span className="mr-2 text-black text-xl font-bold dark:text-white">
            {!dark ? "Desativar" : "Ativar"} Dark Mode
          </span>
          <div className="relative">
            {!dark ? (
              <MdDarkMode
                className="text-5xl cursor-pointer transition-all duration-500"
                onClick={toggleDark}
              />
            ) : (
              <MdOutlineDarkMode
                className="text-5xl cursor-pointer transition-all duration-500"
                onClick={toggleDark}
              />
            )}
          </div>
        </div>
      </div>
    </ContentMain>
  );
};

export default Settings;
