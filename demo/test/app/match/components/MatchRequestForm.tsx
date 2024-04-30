'use client'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  toUserId: Id<"users">
}

export default ({ toUserId }: Props) => {
  const [message, setMessage] = useState('')
  const sendRequest = useMutation(api.backend.sendMatchRequest)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await sendRequest({ toUserId, message })
    setMessage('')
    router.push('/matchRequests')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center rounded-xl border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send Match Request
        </button>
      </div>
    </form>
  )
}
