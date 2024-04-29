
'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useQuery } from "convex/react";
import Navbar from "@/components/Navbar";
import TweetComposer from "@/components/TweetComposer";

export default () => {
  const userId = useStoreUserEffect();
  const tweets = useQuery(api.backend.getTweets, userId ? { limit: 20 } : 'skip');

  return (
    <>
      <Navbar userId={userId} />
      <main>
        <TweetComposer userId={userId} />
        {tweets?.map(tweet => (
          <div key={tweet._id}>
            <p>{tweet.text}</p>
            <p>By: {tweet.userId}</p>
          </div>
        ))}
      </main>
    </>
  );
};
