'use client'
import { Doc } from "@/convex/_generated/dataModel";
import Tweet from "./Tweet";

interface Props {
  tweets: Doc<"tweets">[]
}


export default ({ tweets }: Props) => {
  return (
    <div className="space-y-4">
      {tweets.map(tweet => (
        <Tweet key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};
