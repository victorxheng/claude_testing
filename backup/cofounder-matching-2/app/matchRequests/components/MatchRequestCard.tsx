'use client'
import { useMutation, useQuery } from 'convex/react'
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useState } from 'react';

interface Props {
  request: Doc<"matches">;
  isIncoming: boolean;
}

export default ({ request, isIncoming }: Props) => {
  const [acceptMessage, setAcceptMessage] = useState("");
  
  const acceptMatch = useMutation(api.backend.acceptMatchRequest);
  const rejectMatch = useMutation(api.backend.rejectMatchRequest);
  const requester = useQuery(api.backend.getUserProfile, { userId: request.from });
  const requestee = useQuery(api.backend.getUserProfile, { userId: request.to });

  const handleAccept = () => {
    acceptMatch({ matchId: request._id, message: acceptMessage });
  };

  const handleReject = () => {
    rejectMatch({ matchId: request._id });
  };

  if (!requester || !requestee) {
    return <div>Loading...</div>;
  }
  return (<div>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg px-4 py-4">
      {isIncoming ? (<p className="text-lg leading-6 font-medium text-gray-900">From: {requester.name}</p>) : (<p className="text-lg leading-6 font-medium text-gray-900">To: {requestee.name}</p>)}

    </div>
    <div className="border-t border-gray-200 px-4 py-3">
      <dl className="grid grid-cols-1 gap-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="mt-1 text-sm text-gray-900">{request.status}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Message</dt>
          <dd className="mt-1 text-sm text-gray-900">{request.requestMessage}</dd>
        </div>
        <div>
          {request.status == "accepted" ?
            (
              <>
                <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a href={isIncoming ? requester.linkedin : requestee.linkedin} target="_blank" rel="noopener noreferrer">{isIncoming ? requester.linkedin : requestee.linkedin}</a>
                </dd>
              </>
            ) : null
          }
        </div>
      </dl>
{isIncoming && request.status == "pending" ? (
  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-col">
    <div>
      <label htmlFor="acceptMessage" className="block text-sm font-medium text-gray-700">
        Message (optional)
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          name="acceptMessage"
          id="acceptMessage"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={acceptMessage}
          onChange={(e) => setAcceptMessage(e.target.value)}
        />
      </div>
    </div>
    <div className="mt-3 sm:mt-4 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={handleAccept}
      >
        Accept
      </button>
      <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={handleReject}
      >
        Reject
      </button>
    </div>
  </div>
) : null}
    </div>
  </div>
  )
};