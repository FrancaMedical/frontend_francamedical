import React from "react";
import Settings from "@/components/Layout/Settings";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ContentMain from "../../components/ContentMain";

const SettingsPage = () => {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col w-full mr-auto">
          <Header />
          <Settings />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
