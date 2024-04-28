import Link from "next/link";
import type { Tweets } from "@/convex/schema";

interface TweetItemProps {
  tweet: typeof Tweets.doc.type;
}

export const TweetItem: React.FC<TweetItemProps> = ({ tweet }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <p>{tweet.text}</p>
      <Link href={`/user/${tweet.user.username}`}>
        <a className="text-blue-500">{tweet.user.name}</a>
      </Link>
    </div>
  );
};