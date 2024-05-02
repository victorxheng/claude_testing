'use client'
import { useMutation, useQuery } from 'convex/react'
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Switch, SwitchField } from '@/components/switch'
import { Label, Description } from '@/components/fieldset'

interface Props {
  userId: Id<"users">;
}

export default ({ userId }: Props) => {
  const profile = useQuery(api.backend.getUserProfile, userId ? { userId } : 'skip')
  const updateProfile = useMutation(api.backend.updateUserProfile)

  const handleToggleAvailable = async () => {
    if (profile) {
      await updateProfile({ 
        name: profile.name,
        linkedin: profile.linkedin, 
        description: profile.description,
        isTechnical: profile.isTechnical,
        isAvailable: !profile.isAvailable
      })
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }


  return (
    <SwitchField>
    <Switch checked={profile.isAvailable} onChange={handleToggleAvailable} />
      <Label>Available for matching</Label>
      <Description>Toggle this when you have found a co-founder and are no longer looking.</Description>
    </SwitchField>
  )
}