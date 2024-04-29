'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useQuery } from "convex/react";
import Navbar from "./components/Navbar";
import TweetFeed from "./components/TweetFeed";

export default () => {
  const userId = useStoreUserEffect();
  const tweets = useQuery(api.backend.getUserTweets, userId ? { userId } : 'skip');

  return (
<div className="bg-white">
  <div className="max-w-2xl mx-auto py-8">
    <Navbar userId={userId} />
    <TweetFeed userId={userId} />
  </div>
</div>
  )}