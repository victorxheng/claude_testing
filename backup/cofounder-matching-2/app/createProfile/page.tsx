'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useMutation } from "convex/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfileForm from "./components/ProfileForm";

export default () => {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProfileForm/>
      <Footer />
    </div>
  );
};