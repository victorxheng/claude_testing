'use client'
import { useMutation, useQuery } from 'convex/react'
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import { Button } from '@/components/button'

interface Props {
  userId: Id<"users">;
}

export default ({ userId }: Props) => {
  const user = useQuery(api.backend.getUserProfile, userId ? { userId } : 'skip') as Doc<"users">;
  const updateProfile = useMutation(api.backend.updateUserProfile);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const linkedin = formData.get('linkedin') as string;
    const description = formData.get('description') as string;
    const isTechnical = formData.get('isTechnical') === 'on';
    const isAvailable = formData.get('isAvailable') === 'on';

    await updateProfile({ name, linkedin, description, isTechnical, isAvailable });
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (

    <form onSubmit={handleSubmit}>
      <Fieldset>
        <FieldGroup>
          <Field>
            <Label>Name</Label>
            <Input name="name" defaultValue={user.name} />
          </Field>
          <Field>
            <Label>LinkedIn URL</Label>
            <Input name="linkedin" type="url" defaultValue={user.linkedin} />
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea name="description" defaultValue={user.description} />
          </Field>
          <CheckboxGroup>
            <CheckboxField>
              <Checkbox name="isTechnical" defaultChecked={user.isTechnical} />
              <Label>I am a technical co-founder</Label>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="isAvailable" defaultChecked={user.isAvailable} />
              <Label>I am available and looking for a co-founder</Label>
            </CheckboxField>
          </CheckboxGroup>
          <Button type="submit">Update Profile</Button>
        </FieldGroup>
      </Fieldset>
    </form>
  );
};