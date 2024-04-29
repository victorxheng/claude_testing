'use client'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  userId: string | null;
}


export default ({ userId }: Props) => {
  const tweets = useQuery(
    api.backend.getFollowedUserTweets,
    userId ? { userId } : "skip"
  );

  return (
    <div>
      {tweets?.map((tweet: Doc<"tweets">) => (
        <div key={tweet._id} className="p-4 border rounded-md">
          <p className="text-gray-800">{tweet.text}</p>
          <p className="text-sm text-gray-500">
            By: {tweet.user.username}
          </p>
        </div>
      ))}
    </div>
  );
};