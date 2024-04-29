
'use client'
import { useUser, useClerk } from "@clerk/clerk-react";
import { Avatar, Button, Flex, Link } from "@radix-ui/themes";

interface Props {
}

export default ({}: Props) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <Flex as="nav" justify="between" align="center" p="4">
      <Link href="/" size="4" weight="bold">Tweeter</Link>
      <Flex align="center" gap="4">
        {user ? (
          <>
            <Link href="/compose">Compose</Link>
            <Link href={`/profile/${user.username}`}>
              <Avatar src={user.imageUrl} fallback={user.firstName[0]} />  
            </Link>
            <Button variant="outline" onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>  
        )}
      </Flex>
    </Flex>
  );
};
