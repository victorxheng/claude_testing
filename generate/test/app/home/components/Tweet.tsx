'use client'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  tweet: Doc<"tweets">;
}


export default ({ tweet }: Props) => {
  return (
    <div className="flex p-4 border-b">
      <img
        src={tweet.author.imageUrl}
        alt={tweet.author.username}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <div className="flex items-center">
          <span className="font-bold mr-2">{tweet.author.name}</span>
          <span className="text-gray-500">@{tweet.author.username}</span>
        </div>
        <p>{tweet.text}</p>
      </div>
    </div>
  );
};
