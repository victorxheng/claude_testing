'use client'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  tweets: Doc<"tweets">[]
}
}

export default ({ tweets }: Props) => {
  return (
    <div>
      {tweets.map(tweet => (
        <div key={tweet._id} className="p-4 border rounded-md">
          <p className="text-gray-800">{tweet.text}</p>
          <p className="text-sm text-gray-500">By: {tweet.author.username}</p>
        </div>
      ))}
    </div>
  );
};
};