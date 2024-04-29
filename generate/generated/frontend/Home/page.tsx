'use client';
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/app/useStoreUserEffect";
import { useQuery, useMutation } from "convex/react";

export default () => {
  const userId = useStoreUserEffect();

  return <></>;
};
