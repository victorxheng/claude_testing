'use client'
import Link from 'next/link'
import { useUser } from '@clerk/clerk-react'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  userId: string | null
}

export default ({ userId }: Props) => {
  const { isSignedIn, user } = useUser()

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold">Twitter Clone</h1>
      </Link>
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <Link href={`/profile/${user?.username}`}>
              <img
                src={user?.profileImageUrl}
                className="w-8 h-8 rounded-full"
              />
            </Link>
            <Link href="/compose" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Tweet
            </Link>
          </>
        ) : (
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Log In
          </Link>
        )}
      </div>
    </nav>
  )
}