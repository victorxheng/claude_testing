'use client';
import Navbar from './components/Navbar';
import TweetFeed from './components/TweetFeed';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useQuery } from "convex/react";
import TweetComposer from './components/TweetComposer';

export default () => {
  const userId = useStoreUserEffect();

  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip');

  return (
    <div>
      <Navbar userId={userId} />
      <TweetComposer />
      <TweetFeed tweets={tweets || []} />
    </div>
  );
};