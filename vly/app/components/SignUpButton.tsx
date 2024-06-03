'use client'
import { SignUpButton } from "@clerk/clerk-react";

interface Props {
}

export default ({}: Props) => {
  return (
    <SignUpButton mode="modal">
      <button 
        className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign up
      </button>
    </SignUpButton>
  );
};
