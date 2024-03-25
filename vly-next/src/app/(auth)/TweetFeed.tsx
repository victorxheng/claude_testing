"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useStoreUserEffect from "../useStoreUserEffect";

export default function TweetFeed() {
  const userId = useStoreUserEffect();  
  const tweetIds = userId ? useQuery(api.backend.getTimelineTweets, { userId }) : [];

  return (
    <div className="space-y-6">
      {tweetIds?.map((tweetId) => (
        <div>{String(tweetId)}</div>
      ))}
    </div>
  );
}