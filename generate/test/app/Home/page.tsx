'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import Navbar from './components/Navbar';
import TweetFeed from './components/TweetFeed';

export default () => {
  const userId = useStoreUserEffect();

  if (userId) {
    return (
      <>
        <Navbar />
        <TweetFeed userId={userId} />
      </>
    );
  }
  return <></>;
};
