'use client'
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Props {
  profile: Doc<"users">
}

export default ({ profile }: Props) => {
  const sendRequest = useMutation(api.backend.sendMatchRequest);

  const handleMatchRequest = () => {
    const message = prompt("Enter a message to send with your match request:");
    if (message) {
      sendRequest({ toUserId: profile._id, message });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
      <p className="text-gray-600 mb-4">{profile.description}</p>
      <div className="mb-4">
        <span className="font-semibold">LinkedIn:</span>{" "}
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
          className="text-indigo-600 hover:underline">
          View Profile
        </a>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Technical Founder:</span>{" "}
        {profile.isTechnical ? "Yes" : "No"}
      </div>
      <button 
        onClick={handleMatchRequest}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
      >
        Request Match
      </button>
    </div>
  );
};
