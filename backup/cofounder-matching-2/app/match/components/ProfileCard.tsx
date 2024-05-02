'use client'
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import MatchRequestForm from "./MatchRequestForm";

interface Props {
  profile: Doc<"users">
}

export default ({ profile }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-2">{profile.name}</h2>
      <p className="text-gray-600 mb-4">{profile.description}</p>
      <div className="mb-4">
        <span className="font-semibold">Technical Founder:</span>{" "}
        {profile.isTechnical ? "Yes" : "No"}
      </div>
      <MatchRequestForm toUserId={profile._id} />
    </div>
  );
};
