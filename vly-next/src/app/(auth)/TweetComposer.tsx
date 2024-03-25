"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useStoreUserEffect from "../useStoreUserEffect";

export default function TweetComposer() {
  const userId = useStoreUserEffect();
  const [tweetText, setTweetText] = useState("");
  const postTweet = useMutation(api.backend.postTweet);

  const handleTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      await postTweet({ userId, text: tweetText });
      setTweetText("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <form onSubmit={handleTweetSubmit} className="flex flex-col gap-4">
        <textarea
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening?"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          rows={3}
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}