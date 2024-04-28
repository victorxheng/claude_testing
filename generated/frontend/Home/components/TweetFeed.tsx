'use client'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  tweets: Doc<"tweets">[]
}
interface Props {
  tweets: Doc<"tweets">[]
}
}

export default ({ tweets = fakeTweets }: Props) => {
  const fakeTweets: Doc<"tweets">[] = [
    {
      _id: "1",
      text: "This is a fake tweet!",
      author: {
        username: "fakeuser"
      }
    },
    {
      _id: "2",
      text: "Another fake tweet for testing purposes.",
      author: {
        username: "testuser"
      }
    }
  ];
  return (
    <div>
      {tweets.map(tweet => (
        <div key={tweet._id} className="border p-4 rounded-md mb-4">
          <p className="text-gray-800">{tweet.text}</p>
          <p className="text-gray-500 text-sm">By: {tweet.author.username}</p>
        </div>
      ))}
    </div>
  );
};
};