'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IncomingRequestList from "./components/IncomingRequestList";
import OutgoingRequestList from "./components/OutgoingRequestList";

export default () => {
  const userId = useStoreUserEffect();

  return (
    <div className="bg-white">
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <IncomingRequestList userId={userId} />
            <OutgoingRequestList userId={userId} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
