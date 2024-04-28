'use client'
import Link from 'next/link'
import { useUser } from '@clerk/clerk-react'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  userId: string | null
}
}

export default ({ userId }: Props) => {
  const { isSignedIn } = useUser()

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <span className="text-indigo-600 hover:text-indigo-500">
                  <span className="sr-only">Home</span>
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    {/* Twitter logo SVG */}
                  </svg>
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/search" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Search</Link>
              <Link href="/tweet" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">New Tweet</Link>
            </div>
          </div>
          <div className="flex items-center">
            {isSignedIn ? (
              <Link href={`/profile/${userId}`} className="text-indigo-600 hover:text-indigo-500">
                Profile
              </Link>
            ) : (
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
};