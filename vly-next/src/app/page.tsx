"use client";

import { SignInButton } from "@clerk/clerk-react";
import useStoreUserEffect from "./useStoreUserEffect";
import { useConvexAuth } from "convex/react";

export default function Home() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="App">
      {isAuthenticated ? "Logged in" : <SignInButton mode="modal" />}
    </div>
  );
}
