"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (!isAuthenticated && !isLoading) {
    redirect("/login");
  }
  return (
    <>
    <Navbar />
    <div className="mt-32">
        {children}
    </div>
    </>
  );
}
