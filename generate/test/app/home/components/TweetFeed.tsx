'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import useStoreUserEffect from '@/lib/useStoreUserEffect'
import { Doc, Id } from "@/convex/_generated/dataModel";
interface Props {
  userId: string | null
}


export default ({ userId }: Props) => {
  userId = useStoreUserEffect()
  const tweets = useQuery(api.backend.getUserTweets, userId ? { userId: userId as Id<"users"> } : 'skip')

  return (
    <div>
      {tweets?.map(tweet => (
        <div key={tweet._id}>
          <p>{tweet.text}</p>
          <p>By: {tweet.userId}</p>
        </div>
      ))}
    </div>
  )
}
