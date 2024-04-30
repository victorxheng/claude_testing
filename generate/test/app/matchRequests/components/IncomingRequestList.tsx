'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from "@/convex/_generated/dataModel";
import useStoreUserEffect from '@/lib/useStoreUserEffect'
import MatchRequestCard from './MatchRequestCard'

interface Props {
  userId: Id<"users"> | null
}

export default ({ userId }: Props) => {
  const incomingRequests = useQuery(api.backend.getIncomingMatches, userId ? {} : 'skip')?.filter((request) => request.status === 'pending')

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Incoming Match Requests</h2>
      {incomingRequests?.length === 0 ? (
        <p>No incoming match requests.</p>
      ) : (
        incomingRequests?.map((request) => (
          <MatchRequestCard key={request._id} request={request} isIncoming={true} />
        ))
      )}
    </div>
  )
}