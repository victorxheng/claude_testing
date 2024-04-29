'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useQuery } from "convex/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MatchRequestCard from "./components/MatchRequestCard";

export default () => {
  const userId = useStoreUserEffect();

  const incomingMatches = useQuery(api.backend.getIncomingMatches, userId ? {  } : 'skip');
  const outgoingMatches = useQuery(api.backend.getOutgoingMatches, userId ? {  } : 'skip');

  return (
    <div className="bg-white">
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-black">Incoming Requests</h2>
            {incomingMatches?.map(request => (
              <MatchRequestCard key={request._id} request={request} isIncoming={true} />
            ))}

            <h2 className="text-2xl font-bold mb-4 mt-8 text-black">Outgoing Requests</h2>
            {outgoingMatches?.map(request => (
              <MatchRequestCard key={request._id} request={request} isIncoming={false} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
