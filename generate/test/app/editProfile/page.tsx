'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useQuery, useMutation } from "convex/react";
import Header from "./components/Header";
import MatchStatus from "./components/MatchStatus";
import ProfileForm from "./components/ProfileForm";
import Footer from "./components/Footer";
export default () => {
  const userId = useStoreUserEffect();
  const user = useQuery(api.backend.getUserProfile, userId ? {  } : 'skip');
  const updateProfile = useMutation(api.backend.updateUserProfile);
  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32">
        <div className="mx-auto max-w-xl lg:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Edit Profile</h1>
          <p className="mt-4 text-lg text-gray-600">Update your profile details and co-founder matching status.</p>
          <ProfileForm />
          <MatchStatus userId={userId} />
        </div>
      </main>
      <Footer/>
    </>
  );
};