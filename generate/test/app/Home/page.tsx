
'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useQuery } from "convex/react";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import TweetComposer from "./components/TweetComposer";

export default () => {
  const userId = useStoreUserEffect();

  return (
    <>
      <Navbar />
      <main>
        <TweetComposer userId={userId} />
        <Timeline userId={userId} />
      </main>
    </>
  );
};
