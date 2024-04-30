'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc } from "@/convex/_generated/dataModel";
import useStoreUserEffect from '@/lib/useStoreUserEffect'
import ProfileCard from './ProfileCard';


export default () => {
  const userId = useStoreUserEffect();
  const profiles = useQuery(api.backend.getAvailableProfiles, userId ? { } : 'skip');

  return (
    <div className="py-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {profiles?.map((profile: Doc<"users">) => (
        <ProfileCard key={profile._id} profile={profile} />
      ))}
    </div>
  )
}
