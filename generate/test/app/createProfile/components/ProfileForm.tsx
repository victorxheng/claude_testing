'use client'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import { Button } from '@/components/button'


export default () => {
  const createProfile = useMutation(api.backend.createUserProfile)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const linkedin = formData.get('linkedin') as string
    const description = formData.get('description') as string
    const isTechnical = formData.get('isTechnical') === 'on'

    await createProfile({ name, linkedin, description, isTechnical })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset>
        <FieldGroup>
          <Field>
            <Label>Name</Label>
            <Input name="name" required />
          </Field>
          <Field>
            <Label>LinkedIn Profile URL</Label>
            <Input type="url" name="linkedin" required />
          </Field>
          <Field>
            <Label>Brief background and description</Label>
            <Textarea name="description" required />
          </Field>
          <CheckboxGroup>
            <CheckboxField>
              <Checkbox name="isTechnical" />
              <Label>I am a technical co-founder</Label>
            </CheckboxField>
          </CheckboxGroup>
          <Button type="submit">Create Profile</Button>
        </FieldGroup>
      </Fieldset>
    </form>
  )
}