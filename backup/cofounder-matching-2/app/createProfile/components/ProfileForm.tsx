'use client'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import useStoreUserEffect from '@/lib/useStoreUserEffect'

interface Props {
}

export default ({ }: Props) => {
  const userId = useStoreUserEffect()
  const [name, setName] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [description, setDescription] = useState('')
  const [isTechnical, setIsTechnical] = useState(false)

  const updateProfile = useMutation(api.backend.updateUserProfile)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const linkedin = formData.get('linkedin') as string;
    const description = formData.get('description') as string;
    const isTechnical = formData.get('isTechnical') === 'on';

    if (!userId) return
    await updateProfile({ name, linkedin, description, isTechnical, isAvailable: true })
    window.location.href = '/match'
  }


  return (
    <main className="mx-auto max-w-2xl py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Create Your Profile</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">Fill out the details below to create your co-founder matching profile.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-16 space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Full name</label>
            <div className="mt-2.5">
              <input type="text" name="name" id="name" autoComplete="name" required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-semibold leading-6 text-gray-900">LinkedIn URL</label>
            <div className="mt-2.5">
              <input type="url" name="linkedin" id="linkedin" required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">Description</label>
            <div className="mt-2.5">
              <textarea name="description" id="description" rows={4} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={""} />
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <input id="isTechnical" name="isTechnical" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label htmlFor="isTechnical" className="block text-sm font-medium leading-6 text-gray-900">I am a technical co-founder</label>
          </div>
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create profile</button>
          </div>
        </form>
      </main>
  )
}