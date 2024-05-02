'use client';
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProfileForm from "./components/ProfileForm";
import MatchStatus from "./components/MatchStatus";

export default () => {
  const userId = useStoreUserEffect();

  if (!userId) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32">
        <div className="mx-auto max-w-xl lg:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Edit Profile</h1>
          <p className="mt-4 text-lg text-gray-600">Update your profile details and co-founder matching status.</p>
          <ProfileForm userId={userId} />
          <MatchStatus userId={userId} />
        </div>
      </div>
      <Footer/>
    </div>
  );
};