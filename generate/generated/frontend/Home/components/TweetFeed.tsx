'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import useStoreUserEffect from '@/lib/useStoreUserEffect'
import { Doc } from "@/convex/_generated/dataModel";
interface Props {
  userId: string | null
}
}

export default ({ userId }: Props) => {
  const tweets = useQuery(api.backend.getTimelineTweets, userId ? { userId } : 'skip')

  return (
    <div>
      {tweets?.map(tweet => (
        <div key={tweet._id}>
          <p>{tweet.text}</p>
          <p>By: {tweet.author.username}</p>
        </div>
      ))}
    </div>
  )
}
};