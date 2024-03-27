// raw generation + comments
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/useStoreUserEffect";
import { useUser } from "@clerk/clerk-react";
import Tweet from "./Tweet"; // hallucinated component

export default function TweetFeed() {
  const userId = useStoreUserEffect();
  const { isSignedIn } = useUser();
  // likes to destructure imaginary data object
  const { data: tweets, isLoading, error } = useQuery(
    api.backend.getTimelineTweets,
    isSignedIn ? { userId } : "skip" // needs to check with userId but instead using isSignedIn
  );

  if (isLoading) { // not a thing
    return <div>Loading...</div>;
  }

  if (error) { // not a thing
    return <div>Error: {error.message}</div>;
  }

  if (!isSignedIn || !tweets || tweets.length === 0) {
    return <div>No tweets to display.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Timeline</h2>
      <div className="space-y-4">
        {tweets.map((tweetId) => ( // tweetId has any type; backend doesn't have proper function signatures
          <Tweet key={tweetId} tweetId={tweetId} />
        ))}
      </div>
    </div>
  );
}