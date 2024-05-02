'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useQuery, useMutation } from "convex/react";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import Footer from "./components/Footer";

export default () => {

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
        <ProfileForm />
      </div>
      <Footer />
    </main>
  );
};
