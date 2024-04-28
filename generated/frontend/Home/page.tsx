'use client';
import Navbar from '@/components/Navbar';
import TweetFeed from '@/components/TweetFeed';
import TweetComposer from '@/components/TweetComposer';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useQuery } from "convex/react";
import { useState } from 'react';
import { Doc } from "@/convex/_generated/dataModel";

export default () => {
  const userId = useStoreUserEffect();

  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip');
  const [newTweet, setNewTweet] = useState<Doc<'tweets'> | null>(null);

  const handleTweetPosted = (tweet: Doc<'tweets'>) => {
    setNewTweet(tweet);
  };

  return (
    <div>
      <Navbar userId={userId} />
      <TweetComposer onTweetPosted={handleTweetPosted} />
      <TweetFeed tweets={newTweet ? [newTweet, ...tweets] : tweets} />
    </div>
  );
};
    <div>

