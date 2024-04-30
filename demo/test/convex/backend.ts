
import { v } from "convex/values";
import { mutation, action, query, internalQuery, DatabaseReader, DatabaseWriter } from "./_generated/server";
import { api } from "./_generated/api";
import { filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer, WithoutSystemFields } from "convex/server";
import { useMutation, useQuery } from "convex/react";

import schema, { Users, Matches } from "./schema";


async function verify(ctx: GenericQueryCtx<any>) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call");
  }
  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();
  if (!user) {
    throw new Error("Unauthenticated call");
  }
  return [identity, user]
}

//returns a full table scan query based on an optional filter
function getManyUsers(db: DatabaseReader, fltr?: (f: typeof Users.doc.type) => Promise<boolean> | boolean) { return filter(db.query("users"), fltr ? fltr : () => true) }

//returns one document based on an id
async function getOneUsers(db: DatabaseReader, id: string | Id<"users">) { return await db.get(id as Id<"users">) }

//returns a full table scan query based on an optional filter
function getManyMatches(db: DatabaseReader, fltr?: (f: typeof Matches.doc.type) => Promise<boolean> | boolean) { return filter(db.query("matches"), fltr ? fltr : () => true) }

//returns one document based on an id
async function getOneMatches(db: DatabaseReader, id: string | Id<"matches">) { return await db.get(id as Id<"matches">) }

//creates one document based on data object, returns the resulting document id
async function createOneUsers(db: DatabaseWriter, data: WithoutSystemFields<typeof Users.doc.type>) { return await db.insert("users", data); }

//creates one document based on data object, returns the resulting document id
async function createOneMatches(db: DatabaseWriter, data: WithoutSystemFields<typeof Matches.doc.type>) { return await db.insert("matches", data); }

//updates one document based on an id and a partial data object, returns nothing
async function updateOneUsers(db: DatabaseWriter, id: Id<"users">, data: Partial<any>) { await db.patch(id, data); }

//updates one document based on an id and a partial data object, returns nothing
async function updateOneMatches(db: DatabaseWriter, id: Id<"matches">, data: Partial<any>) { await db.patch(id, data); }

//deletes one document based on an id, returns nothing
async function deleteOneUsers(db: DatabaseWriter, id: Id<"users">) { await db.delete(id); }

//deletes one document based on an id, returns nothing
async function deleteOneMatches(db: DatabaseWriter, id: Id<"matches">) { await db.delete(id); }


//Retrieves the profile of the currently logged in user.
export const getUserProfile = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const userProfile = await getOneUsers(d, args.userId);
    return userProfile;
  },
});

//Retrieves a list of user profiles that are available for matching, excluding the current user.
export const getAvailableProfiles = query({
  args: {
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const availableProfiles = await getManyUsers(d, (u) => u.isAvailable && u._id != user._id).collect();
    return availableProfiles;
  },
});

//Retrieves a list of incoming match requests for the current user.
export const getIncomingMatches = query({
  args: {
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security //security

    const d = ctx.db
    const incomingMatches = await getManyMatches(d, (m) => m.to == user._id).collect();
    return incomingMatches;
  },
});

//Retrieves a list of outgoing match requests sent by the current user.
export const getOutgoingMatches = query({
  args: {
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security //security

    const d = ctx.db
    const outgoingMatches = await getManyMatches(d, (m) => m.from == user._id).collect();
    return outgoingMatches;
  },
});


//Retrieves a list of outgoing match requests sent by the current user.
export const getMatches = query({
  args: {
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security //security

    const d = ctx.db
    const matches = await getManyMatches(d, (m) => (m.from == user._id || m.to == user._id) && m.status == "accepted").collect();
    return matches;
  },
});

//Creates a new user profile document.
export const createUserProfile = mutation({
  args: {
    name: v.string(), //The user's full name
    linkedin: v.string(), //URL to the user's LinkedIn profile
    description: v.string(), //Brief user description
    isTechnical: v.boolean(), //Whether the user is a technical cofounder
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const userId = await createOneUsers(d, { email: identity.email, name: args.name, linkedin: args.linkedin, description: args.description, isTechnical: args.isTechnical, isAvailable: true, tokenIdentifier: identity.tokenIdentifier });
    return userId;
  },
});

//Updates the current user's profile document.
export const updateUserProfile = mutation({
  args: {
    name: v.string(), //The user's full name
    linkedin: v.string(), //URL to the user's LinkedIn profile
    description: v.string(), //Brief user description
    isTechnical: v.boolean(), //Whether the user is a technical cofounder
    isAvailable: v.boolean(), //Whether the user is available for matching
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    await updateOneUsers(d, user._id, { name: args.name, linkedin: args.linkedin, description: args.description, isTechnical: args.isTechnical, isAvailable: args.isAvailable });
    const updatedUser = await getOneUsers(d, user._id);
    return updatedUser;
  },
});

//Sends a new match request from the current user to another user.
export const sendMatchRequest = mutation({
  args: {
    toUserId: v.id("users"), //ID of the user to send the request to
    message: v.string(), //Message to include with the match request
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const matchId = await createOneMatches(d, { from: user._id, to: args.toUserId, status: "pending", requestMessage: args.message });
    return matchId;
  },
});

//Accepts an incoming match request.
export const acceptMatchRequest = mutation({
  args: {
    matchId: v.id("matches"), //ID of the match request document
    message: v.optional(v.string()), //Optional message when accepting the request
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const match = await getOneMatches(d, args.matchId);
    if (match!.to != user._id) { throw new Error("Unauthorized"); }
    await updateOneMatches(d, args.matchId, { status: "accepted", acceptMessage: args.message });
    const updatedMatch = await getOneMatches(d, args.matchId);
    return updatedMatch;
  },
});

//Rejects an incoming match request.
export const rejectMatchRequest = mutation({
  args: {
    matchId: v.id("matches"), //ID of the match request document
  },
  handler: async (ctx, args) => {
    const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const match = await getOneMatches(d, args.matchId);
    if (match!.to != user._id) { throw new Error("Unauthorized"); }
    await updateOneMatches(d, args.matchId, { status: "rejected" });
    const updatedMatch = await getOneMatches(d, args.matchId);
    return updatedMatch;
  },
});
