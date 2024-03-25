"use client";

import useStoreUserEffect from "../useStoreUserEffect";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import TweetComposer from "./TweetComposer";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  useStoreUserEffect();
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (!isAuthenticated && !isLoading) {
    redirect("/login");
  }
  return (
    <>
    <Navbar />
    <div className="mt-32">
        <TweetComposer />
        {children}
    </div>
    </>
  );
}
