'use client';
import { api } from "@/convex/_generated/api";
import { TweetList } from "./components/TweetList";
import { useQuery } from "convex/react";
import useStoreUserEffect from "@/app/useStoreUserEffect";

export default () => {
    const userId = useStoreUserEffect();
    const timelineTweets: any = useQuery(api.backend.getTimelineTweets, userId ? { userId: userId } : "skip");
    
    if (timelineTweets) {
        return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Home Timeline</h1>
            <TweetList tweets={timelineTweets} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post Tweet</button>
        </div>
        );
    }
    return <></>;
  };