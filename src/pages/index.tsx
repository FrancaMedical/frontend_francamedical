import Head from "next/head";
import Login from "./Login";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import QueryListPage from "./QueryList";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAuthenticated ? <QueryListPage /> : <Login />}
    </>
  );
}
