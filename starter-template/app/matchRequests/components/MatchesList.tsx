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
  const matches = useQuery(api.backend.getMatches, userId ? { } : 'skip');

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Matches</h2>
      {matches?.map((request) => (
        <MatchRequestCard key={request._id} request={request as Doc<"matches">} isIncoming={request.from != userId} />  
      ))}
      {matches?.length === 0 && (
        <p className="text-gray-600">You have no outgoing match requests at this time.</p>
      )}
    </div>
  );
};