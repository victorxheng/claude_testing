
import { v } from "convex/values";
import { mutation, action, query, internalQuery, DatabaseReader, DatabaseWriter } from "./_generated/server";
import { api } from "./_generated/api";
import { filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer, WithoutSystemFields } from "convex/server";
import { useMutation, useQuery } from "convex/react";

import schema, { Users, Tweets, Follows } from "./schema";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name }); // this is where data is updated from clerk
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "",
      username: identity.nickname ?? "",
      bio: ""
    });
  },
});

async function verify(ctx: GenericQueryCtx<any>){
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
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
function getManyUsers(db: DatabaseReader, fltr?: (f: typeof Users.doc.type) => Promise<boolean> | boolean){return filter(db.query("users"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneUsers(db: DatabaseReader, id: string | Id<"users">){return await db.get(id as Id<"users">)}

//returns a full table scan query based on an optional filter
function getManyTweets(db: DatabaseReader, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean){return filter(db.query("tweets"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneTweets(db: DatabaseReader, id: string | Id<"tweets">){return await db.get(id as Id<"tweets">)}

//returns a full table scan query based on an optional filter
function getManyFollows(db: DatabaseReader, fltr?: (f: typeof Follows.doc.type) => Promise<boolean> | boolean){return filter(db.query("follows"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneFollows(db: DatabaseReader, id: string | Id<"follows">){return await db.get(id as Id<"follows">)}

//creates one document based on data object, returns the resulting document id
async function createOneUsers(db: DatabaseWriter, data: WithoutSystemFields<typeof Users.doc.type>){return await db.insert("users", data);}

//creates one document based on data object, returns the resulting document id
async function createOneTweets(db: DatabaseWriter, data: WithoutSystemFields<typeof Tweets.doc.type>){return await db.insert("tweets", data);}

//creates one document based on data object, returns the resulting document id
async function createOneFollows(db: DatabaseWriter, data: WithoutSystemFields<typeof Follows.doc.type>){return await db.insert("follows", data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneUsers(db: DatabaseWriter, id: Id<"users">, data: Partial<any>){await db.patch(id, data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneTweets(db: DatabaseWriter, id: Id<"tweets">, data: Partial<any>){await db.patch(id, data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneFollows(db: DatabaseWriter, id: Id<"follows">, data: Partial<any>){await db.patch(id, data);}

//deletes one document based on an id, returns nothing
async function deleteOneUsers(db: DatabaseWriter, id: Id<"users">){await db.delete(id);}

//deletes one document based on an id, returns nothing
async function deleteOneTweets(db: DatabaseWriter, id: Id<"tweets">){await db.delete(id);}

//deletes one document based on an id, returns nothing
async function deleteOneFollows(db: DatabaseWriter, id: Id<"follows">){await db.delete(id);}


//Retrieves a user's profile information
export const getUserProfile = query({
  args: {
    username: v.string(), //The username of the user whose profile to retrieve
  },
  handler: async (ctx, args) => {
    const d = ctx.db
    const user = await getManyUsers(d, (user) => user.username == args.username).unique();
		return user;
  },
});

//Retrieves a list of tweets posted by a user
export const getUserTweets = query({
  args: {
    userId: v.id("users"), //The ID of the user whose tweets to retrieve
  },
  handler: async (ctx, args) => {
    const d = ctx.db
    const tweets = await getManyTweets(d, (tweet) => tweet.userId == args.userId).collect();
		return tweets;
  },
});

//Retrieves the list of users that a user is following
export const getFollowing = query({
  args: {
    userId: v.id("users"), //The ID of the user to get the following list for
  },
  handler: async (ctx, args) => {
    const d = ctx.db
    const follows = await getManyFollows(d, (follow) => follow.followerId == args.userId).collect();
		const followedUserIds = follows.map(follow => follow.followedId);
		const followedUsers = await Promise.all(followedUserIds.map(userId => getOneUsers(d, userId)));
		return followedUsers;
  },
});

//Retrieves the list of users following a user
export const getFollowers = query({
  args: {
    userId: v.id("users"), //The ID of the user to get the followers list for
  },
  handler: async (ctx, args) => {
    const d = ctx.db
    const follows = await getManyFollows(d, (follow) => follow.followedId == args.userId).collect();
		const followerUserIds = follows.map(follow => follow.followerId);
		const followerUsers = await Promise.all(followerUserIds.map(userId => getOneUsers(d, userId)));
		return followerUsers;
  },
});

//Posts a new tweet by the authenticated user
export const postTweet = mutation({
  args: {
    text: v.string(), //The text content of the new tweet
  },
  handler: async (ctx, args) => {
		const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const tweetId = await createOneTweets(d, {userId: user._id, text: args.text});
		const tweet = await getOneTweets(d, tweetId);
		return tweet;
  },
});

//Creates a follow relationship from the authenticated user to another user
export const followUser = mutation({
  args: {
    userId: v.id("users"), //The ID of the user to follow
  },
  handler: async (ctx, args) => {
		const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const followId = await createOneFollows(d, {followerId: user._id, followedId: args.userId});
		const follow = await getOneFollows(d, followId);
		return follow;
  },
});

//Removes a follow relationship from the authenticated user to another user
export const unfollowUser = mutation({
  args: {
    userId: v.id("users"), //The ID of the user to unfollow
  },
  handler: async (ctx, args) => {
		const [identity, user] = await verify(ctx) //security

    const d = ctx.db
    const follow = await getManyFollows(d, (follow) => follow.followerId == user._id && follow.followedId == args.userId).unique();
		await deleteOneFollows(d, follow!._id);
		return follow;
  },
});