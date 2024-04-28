import { TweetItem } from "./TweetItem";
import { Doc } from "@/convex/_generated/dataModel";

interface TweetListProps {
  tweets: Doc<"tweets">[]
}

export const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};