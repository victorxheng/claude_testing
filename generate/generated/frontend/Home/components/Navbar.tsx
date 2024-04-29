'use client'
import { Flex, Box, Link, Avatar } from '@radix-ui/react-components'
import { Logo } from '@/components/Logo'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
}

export default ({}: Props) => {
  return (
    <Flex align="center" justify="between" p="4">
      <Logo />
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
      <Avatar />
    </Flex>
  );
};
};