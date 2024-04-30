'use client'
import { useMutation, useQuery } from 'convex/react'
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface Props {
  request: Doc<"matches">;
  userId: Id<"users">;
}

export default ({ request, userId }: Props) => {
  const acceptMatch = useMutation(api.backend.acceptMatchRequest);
  const rejectMatch = useMutation(api.backend.rejectMatchRequest);
  const requester = useQuery(api.backend.getUserProfile);

  const handleAccept = () => {
    acceptMatch({ matchId: request._id });
  };

  const handleReject = () => {
    rejectMatch({ matchId: request._id });
  };

  if (!requester) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Match Request</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">From: {requester.name}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Message</dt>
            <dd className="mt-1 text-sm text-gray-900">{request.requestMessage}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">LinkedIn Profile</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <a href={requester.linkedin} target="_blank" rel="noopener noreferrer">{requester.linkedin}</a>
            </dd>
          </div>
        </dl>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
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
  );
};