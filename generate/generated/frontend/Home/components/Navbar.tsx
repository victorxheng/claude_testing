'use client'
import Link from 'next/link'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  isLoggedIn: boolean
}

export default ({ isLoggedIn }: Props) => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-2xl font-bold">Twitter Clone</span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link href="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link href="/compose">Compose</Link>
            <Link href="/profile">Profile</Link>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <div className="md:hidden">
        {/* Mobile menu toggle button */}
      </div>
    </nav>
  )
}