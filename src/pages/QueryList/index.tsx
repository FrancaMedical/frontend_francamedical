import React from "react";
import QueryList from "../../components/Layout/QueryList";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ContentMain from "../../components/ContentMain";

const QueryListPage = () => {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col w-full mr-auto">
          <Header />
          <QueryList />
        </div>
      </div>
    </>
  );
};

export default QueryListPage;
