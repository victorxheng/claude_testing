'use client'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from "@/convex/_generated/dataModel";

interface Props {
  userId: Id<"users"> | null
}

export default ({ userId }: Props) => {
  const profile = useQuery(api.backend.getUserProfile, userId ? { userId } : 'skip')
  const updateProfile = useMutation(api.backend.updateUserProfile)

  const handleToggleAvailable = async () => {
    if (profile) {
      await updateProfile({ 
        name: profile.name,
        linkedin: profile.linkedin, 
        description: profile.description,
        isTechnical: profile.isTechnical,
        isAvailable: !profile.isAvailable
      })
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Match Status</h2>
      <p className="mb-4">
        {profile.isAvailable ? 'Your profile is currently available for matching.' 
          : 'Your profile is not currently available for matching.'}
      </p>
      <button
        type="button"
className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
  ${profile.isAvailable ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'} 
          focus:outline-none focus:ring-2 focus:ring-offset-2`}
        onClick={handleToggleAvailable}
      >
        {profile.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
      </button>
    </div>
  )
}