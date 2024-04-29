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
  const outgoingRequests = useQuery(api.backend.getOutgoingMatches, userId ? {  } : 'skip')

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Outgoing Match Requests</h2>
      {outgoingRequests?.map((request) => (
        <MatchRequestCard key={request._id} request={request as Doc<"matches">} isIncoming={false} />  
      ))}
      {outgoingRequests?.length === 0 && (
        <p className="text-gray-600">No outgoing match requests.</p>
      )}
    </div>
  );
};