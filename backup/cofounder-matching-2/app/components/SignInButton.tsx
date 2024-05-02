'use client'
import { SignInButton } from "@clerk/clerk-react";

interface Props {
}

export default ({}: Props) => {
  return (
    <SignInButton mode="modal">
      <button 
        className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Log in
      </button>
    </SignInButton>
  );
};
