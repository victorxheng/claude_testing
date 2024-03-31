
import { v } from "convex/values";
import { mutation, action, query, internalQuery } from "./_generated/server";
import { api } from "./_generated/api";
import { filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer } from "convex/server";
import { useMutation, useQuery } from "convex/react";

import schema, { Users, Tweets, Follows } from "./schema";


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
}

//returns a full table scan query based on an optional filter
function getManyUsers(db: GenericDatabaseReader<any>, fltr?: (f: typeof Users.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{return filter(db.query("users"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneUsers(db: GenericDatabaseReader<any>, id: string | Id<"users">):  Promise<DocumentByInfo<GenericTableInfo>[]>{return await db.get(id as Id<"users">)}

//returns a full table scan query based on an optional filter
function getManyTweets(db: GenericDatabaseReader<any>, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{return filter(db.query("tweets"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneTweets(db: GenericDatabaseReader<any>, id: string | Id<"tweets">):  Promise<DocumentByInfo<GenericTableInfo>[]>{return await db.get(id as Id<"tweets">)}

//returns a full table scan query based on an optional filter
function getManyFollows(db: GenericDatabaseReader<any>, fltr?: (f: typeof Follows.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{return filter(db.query("follows"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneFollows(db: GenericDatabaseReader<any>, id: string | Id<"follows">):  Promise<DocumentByInfo<GenericTableInfo>[]>{return await db.get(id as Id<"follows">)}

//creates one document based on data object, returns the resulting document id
async function createOneUsers(db: GenericDatabaseWriter<any>, data: {[x: string]: any;}){return await db.insert("users", data);}

//creates one document based on data object, returns the resulting document id
async function createOneTweets(db: GenericDatabaseWriter<any>, data: {[x: string]: any;}){return await db.insert("tweets", data);}

//creates one document based on data object, returns the resulting document id
async function createOneFollows(db: GenericDatabaseWriter<any>, data: {[x: string]: any;}){return await db.insert("follows", data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneUsers(db: GenericDatabaseWriter<any>, id: Id<"users">, data: Partial<any>){await db.patch(id, data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneTweets(db: GenericDatabaseWriter<any>, id: Id<"tweets">, data: Partial<any>){await db.patch(id, data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneFollows(db: GenericDatabaseWriter<any>, id: Id<"follows">, data: Partial<any>){await db.patch(id, data);}

//deletes one document based on an id, returns nothing
async function deleteOneUsers(db: GenericDatabaseWriter<any>, id: Id<"users">){await db.delete(id);}

//deletes one document based on an id, returns nothing
async function deleteOneTweets(db: GenericDatabaseWriter<any>, id: Id<"tweets">){await db.delete(id);}

//deletes one document based on an id, returns nothing
async function deleteOneFollows(db: GenericDatabaseWriter<any>, id: Id<"follows">){await db.delete(id);}


//Retrieves the profile details for a given user ID.
export const getUserProfile = query({
  args: {
    userId: v.id("users"), //The ID of the user to retrieve the profile for.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
    d = ctx.db
    const user = await getOneUsers(d, args.userId)
		return user
  },
});

//Retrieves tweet objects for the given user's timeline based on who they follow.
export const getTimelineTweets = query({
  args: {
    userId: v.id("users"), //The ID of the user to retrieve the timeline tweets for.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
		await verify(ctx) //security

    d = ctx.db
    const follows = await getManyFollows(d, (follow) => follow.followerId == args.userId).collect()
		const followedUserIds = follows.map(follow => follow.followedId)
		const timelineTweets = await getManyTweets(d, (tweet) => followedUserIds.includes(tweet.userId)).order("desc").collect()
		return timelineTweets
  },
});

//Searches for users based on a search query string.
export const searchUsers = query({
  args: {
    query: v.string(), //The search query string to match against usernames and names.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
    d = ctx.db
    const users = await getManyUsers(d, (user) => user.username.includes(args.query) || user.name.includes(args.query)).collect()
		return users
  },
});

//Searches for tweets based on a search query string.
export const searchTweets = query({
  args: {
    query: v.string(), //The search query string to match against tweet text.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
    d = ctx.db
    const tweets = await getManyTweets(d, (tweet) => tweet.text.includes(args.query)).collect()
		return tweets
  },
});

//Creates a new tweet posted by the given user.
export const postTweet = mutation({
  args: {
    userId: v.id("users"), //The ID of the user posting the tweet.
text: v.string(), //The text content of the new tweet.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
		await verify(ctx) //security

    d = ctx.db
    const tweetId = await createOneTweets(d, {userId: args.userId, text: args.text})
		const tweet = await getOneTweets(d, tweetId)
		return tweet
  },
});

//Creates a new follow relationship between two users.
export const followUser = mutation({
  args: {
    followerId: v.id("users"), //The ID of the user doing the following.
followedId: v.id("users"), //The ID of the user being followed.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
		await verify(ctx) //security

    d = ctx.db
    const followId = await createOneFollows(d, {followerId: args.followerId, followedId: args.followedId})
		const follow = await getOneFollows(d, followId)
		return follow
  },
});

//Removes an existing follow relationship between two users.
export const unfollowUser = mutation({
  args: {
    followerId: v.id("users"), //The ID of the user doing the unfollowing.
followedId: v.id("users"), //The ID of the user being unfollowed.
  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
		await verify(ctx) //security

    d = ctx.db
    const follow = await getManyFollows(d, (follow) => follow.followerId == args.followerId && follow.followedId == args.followedId).unique()
		await deleteOneFollows(d, follow._id)
  },
});
