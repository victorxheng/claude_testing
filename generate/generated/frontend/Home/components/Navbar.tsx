'use client'
import Link from 'next/link'
import { useUser } from '@clerk/clerk-react'
import useStoreUserEffect from '@/useStoreUserEffect'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  isHomePage?: boolean
}
}

export default ({ isHomePage = false }: Props) => {
  const { isSignedIn } = useUser()
  const userId = useStoreUserEffect()

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white px-4 py-4 shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Twitter Clone
        </Link>
        <div className="hidden space-x-4 md:flex">
          <Link href="/">Home</Link>
          {isSignedIn && (
            <>
              <Link href={`/profile/${userId}`}>Profile</Link>
              <Link href="/compose">Compose</Link>
            </>
          )}
        </div>
        <div>
          {!isSignedIn && <Link href="/login">Log in</Link>}
        </div>
      </div>
    </nav>
  )
}
};