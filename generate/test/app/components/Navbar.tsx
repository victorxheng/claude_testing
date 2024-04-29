'use client'

import Link from 'next/link'
import { useUser } from '@clerk/clerk-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
interface Props {
  userId: string | null
}

export default ({ userId }: Props) => {
  const { isSignedIn, user } = useUser()
  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip')

  return (
    <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3">
      <Link href="/">
        <h1 className="text-2xl font-bold">Twitter Clone</h1>
      </Link>

        <Link href="/">Timeline</Link>
        <Link href="/compose">Compose</Link>
        {userId && <Link href={`/profile/${user.username}`}>Profile</Link>}
      

      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <Link href={`/profile/${user.username}`}>
              <img
                src={user.profileImageUrl}
                className="w-8 h-8 rounded-full"
              />
            </Link>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>

      <div className="flex items-center">
        {isSignedIn ? (
          <Link href="/api/auth/logout">Logout</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}