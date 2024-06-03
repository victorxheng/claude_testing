/*
The YC Co-founder Matching website allows entrepreneurs to create a profile and find contact information of other entrepreneurs to potentially match with as co-founders. Users can create a profile, view and match with other profiles, manage match requests, and edit their profile.

1. Home landing page advertising the site with Clerk authentication to create account
2. Profile creation page to fill out name, background, LinkedIn profile, and technical cofounder status
3. Match page to view other available user profiles and send match requests with message
4. View and manage incoming match requests, approve to connect on LinkedIn or reject
5. Edit profile page and mark profile as matched once co-founder is found
*/


import { Table } from "convex-helpers/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export const Users = Table("users", {
	email: v.string(), //User's email, populated from Clerk auth
	name: v.string(), //User's full name
	linkedin: v.string(), //URL to user's LinkedIn profile
	description: v.string(), //Brief background and description of the user
	isTechnical: v.boolean(), //Whether the user is a technical cofounder
	isAvailable: v.boolean(), //Whether the user is available and looking for a cofounder
	tokenIdentifier: v.string(),
});

export const Matches = Table("matches", {
	from: v.id("users"), //ID of the user sending the match request
	to: v.id("users"), //ID of the user receiving the match request
	status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("rejected")), //Status of the match request
	requestMessage: v.string(), //Message included with the match request
	acceptMessage: v.optional(v.string()), //Message included when accepting the match request
});


export default defineSchema({
	users: Users.table.index("by_token", ["tokenIdentifier"]),
	matches: Matches.table,
  },
  { schemaValidation: true }
);