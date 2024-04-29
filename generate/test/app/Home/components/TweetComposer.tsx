
'use client'
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TextArea, Button } from "@radix-ui/themes";
import { Id } from "@/convex/_generated/dataModel";
import { useRef } from "react";

interface Props {
  userId: Id<"users"> | null;
}

export default ({ userId }: Props) => {
  const postTweet = useMutation(api.backend.postTweet);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text") as string;
    if (userId) {
      postTweet({ text });
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea name="text" placeholder="What's happening?" ref={textAreaRef} />
      <Button type="submit">Tweet</Button>
    </form>
  );
};
