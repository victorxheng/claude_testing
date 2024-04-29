'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useQuery } from "convex/react";
import TweetList from "@/components/TweetList";
import Tweet from "@/components/Tweet";

export default () => {
  const userId = useStoreUserEffect();
  const following = useQuery(api.backend.getFollowing, userId ? { userId } : 'skip');
  const followedUserTweets = following?.flatMap(followedUser =>
    useQuery(api.backend.getUserTweets, { userId: followedUser!._id })
  ) || [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <TweetList tweets={followedUserTweets} />
      </div>
    </div>
  );
};
