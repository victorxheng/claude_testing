'use client'
import { Flex, Box, Link, Avatar } from '@radix-ui/themes'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
}

export default ({}: Props) => {
  return (
    <Flex align="center" justify="between" p="4">
      <Flex gap="4">
        <Link href="/" size="3" weight="bold">
          Home
        </Link>
        <Link href="/profile/[username]" size="3" weight="bold">
          Profile
        </Link>
        <Link href="/compose" size="3" weight="bold">
          Compose
        </Link>
      </Flex>
    </Flex>
  );
};