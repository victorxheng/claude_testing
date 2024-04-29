'use client';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import Navbar from "./components/Navbar";
import TweetList from "./components/TweetList";

export default () => {
  const userId = useStoreUserEffect();
  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip');

  return (
    <div>
      <Navbar userId={userId} />
      <main className="mt-20">
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
};
