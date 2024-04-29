'use client'
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from "@/convex/_generated/dataModel";
import useStoreUserEffect from '@/lib/useStoreUserEffect';

interface Props {
}

export default ({}: Props) => {
  const userId = useStoreUserEffect();
  const user = useQuery(api.backend.getUserProfile, userId ? {  } : 'skip') as Doc<"users">;
  
  const [name, setName] = useState(user?.name ?? '');
  const [linkedin, setLinkedIn] = useState(user?.linkedin ?? '');
  const [description, setDescription] = useState(user?.description ?? '');
  const [isTechnical, setIsTechnical] = useState(user?.isTechnical ?? false);
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);

  const updateProfile = useMutation(api.backend.updateUserProfile);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile({ 
      name, 
      linkedin, 
      description, 
      isTechnical,
      isAvailable
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn URL
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
            </div>

            <div className="sm:col-span-6">
              <legend className="text-base font-medium text-gray-900">Technical Co-Founder</legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="technical-yes"
                    name="technical"
                    type="radio"
                    checked={isTechnical}
                    onChange={() => setIsTechnical(true)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="technical-yes" className="ml-3 block text-sm font-medium text-gray-700">
                    Yes, I am a technical co-founder
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="technical-no"
                    name="technical"
                    type="radio"
                    checked={!isTechnical}
                    onChange={() => setIsTechnical(false)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="technical-no" className="ml-3 block text-sm font-medium text-gray-700">
                    No, I am a non-technical co-founder
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="available"
                    name="available"
                    type="checkbox"
                    checked={isAvailable}
                    onChange={() => setIsAvailable(!isAvailable)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="available" className="font-medium text-gray-700">
                    Available for matching
                  </label>
                  <p className="text-gray-500">Check this box if you are currently available and looking for a co-founder.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};