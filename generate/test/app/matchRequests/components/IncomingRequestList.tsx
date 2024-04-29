'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc } from "@/convex/_generated/dataModel";
import useStoreUserEffect from '@/lib/useStoreUserEffect'
import MatchRequestCard from './MatchRequestCard'

interface Props {
  userId: string | null
}

export default ({ userId }: Props) => {
  const incomingRequests = useQuery(api.backend.getIncomingMatches, userId ? {  } : 'skip')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Incoming Match Requests</h2>
      {incomingRequests?.map((request) => (
        <MatchRequestCard key={request._id} request={request} isIncoming={false} />
      ))}
    </div>
  )
}