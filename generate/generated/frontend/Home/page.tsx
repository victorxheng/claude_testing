'use client';
import Navbar from '@/components/Navbar';
import TweetFeed from '@/components/TweetFeed';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";

export default () => {
  const userId = useStoreUserEffect();
  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip');

  return (
    <div>
      <Navbar isHomePage />
      <div className="mt-20">
        <TweetFeed tweets={tweets} />
      </div>
    </div>
  );
};
    <div>
      <Navbar isHomePage />
      <div className="mt-20">
        {tweets?.map(tweet => (
          <div key={tweet._id} className="mb-4 rounded-lg bg-gray-100 p-4">
            <p>{tweet.text}</p>
            <p className="text-sm text-gray-500">By: {tweet.author.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
