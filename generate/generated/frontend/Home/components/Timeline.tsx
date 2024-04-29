
'use client'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Flex, Avatar, Text, Skeleton } from "@radix-ui/themes";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface Props {
  userId: Id<"users"> | null;
}

export default ({ userId }: Props) => {
  const tweets = useQuery(api.backend.getTweets, userId ? { userId } : 'skip');

  if (!tweets) {
    return <Skeleton width="100%" height="200px" />;
  }

  return (
    <Flex direction="column" gap="4">
      {tweets.map((tweet) => (
        <Flex key={tweet._id} gap="3" align="start">
          <Avatar src={tweet.author.imageUrl} fallback={tweet.author.name[0]} />
          <Text>{tweet.text}</Text>
        </Flex>
      ))}
    </Flex>
  );
};
