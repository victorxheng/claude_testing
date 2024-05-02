'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useQuery, useMutation } from "convex/react";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import MatchStatus from "./components/MatchStatus";
import { Text } from "@/components/text";
import { FieldGroup } from "@/components/fieldset";
import Footer from "./components/Footer";

export default () => {
  const userId = useStoreUserEffect();

  return (
    <main className="min-h-screen">
      <Header />
      {userId && (
        <>
        <div className="max-w-md mx-auto mt-8">
          <FieldGroup>
          <Text>Edit Your Profile</Text>
          <ProfileForm  userId={userId}/>
          <MatchStatus userId={userId} />
          </FieldGroup>
        </div>
        </>
      )}
      <Footer/>
    </main>
  );
};
