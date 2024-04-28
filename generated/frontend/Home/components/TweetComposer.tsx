'use client'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import useStoreUserEffect from '@/useStoreUserEffect'
import { Doc } from "@/convex/_generated/dataModel";

interface Props {}
}

export default () => {
  const userId = useStoreUserEffect()
  const [text, setText] = useState('')
  const postTweet = useMutation(api.backend.postTweet)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userId && text) {
      await postTweet({ userId, text })
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What's happening?"
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={!text}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Tweet
      </button>
    </form>
  )
}

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What's happening?"
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={!text}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Tweet
      </button>
    </form>
  )
}
};