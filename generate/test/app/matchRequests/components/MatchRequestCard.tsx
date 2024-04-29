'use client'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {
  request: Doc<"matches">
  isIncoming: boolean
}

export default ({ request, isIncoming }: Props) => {
  const acceptMatch = useMutation(api.backend.acceptMatchRequest)
  const rejectMatch = useMutation(api.backend.rejectMatchRequest)

  const handleAccept = () => {
    acceptMatch({ matchId: request._id })
  }

  const handleReject = () => {
    rejectMatch({ matchId: request._id })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        {/*<h3 className="text-lg font-semibold">{isIncoming ? request.from.name : request.to.name}</h3>*/}
        <span className={`px-2 py-1 rounded text-sm ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : request.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {request.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{request.requestMessage}</p>
      {isIncoming && request.status === 'pending' && (
        <div className="flex justify-end">
          <button 
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={handleAccept} 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  )
}