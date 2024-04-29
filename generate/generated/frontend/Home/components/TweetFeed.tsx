'use client'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
}

export default ({}: Props) => {
  const userId = useStoreUserEffect();
  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip');

  return (
    <Flex direction="column" gap="4">
      {tweets?.map(tweet => (
        <Box key={tweet._id} p="4" borderWidth="1px" borderColor="gray.300" borderRadius="md">
          <Flex gap="2" align="center">
            <Avatar name={tweet.author.name} src={tweet.author.imageUrl} />
            <Text fontWeight="semibold">{tweet.author.username}</Text>
          </Flex>
          <Text mt="2">{tweet.text}</Text>
        </Box>
      ))}
    </Flex>
  );
};
};