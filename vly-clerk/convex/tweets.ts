import { v } from "convex/values";
import { mutation, action, query, internalQuery } from "./_generated/server";
import { api } from "./_generated/api";
import schema, { Tweets, User } from "./schema";
import { filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer } from "convex/server";
import { useMutation, useQuery } from "convex/react";



// in the front end under lib/functions
export function getMainFeedFrontEnd() {return useQuery(api.tweets.getMainFeed, {})}

// in the back end under convex/myFunctions
export const getMainFeed = query({
  args: {

  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
    //security 
    await verify(ctx)

    const d = ctx.db
    const tweets = await getTweets(d).collect()
    return tweets
  },
});

export const postTweet = mutation({
  args: {tweet: Tweets.doc, tweets: v.string()
  },
  handler: async (ctx, args): Promise<Id<"tweets">> => {
    //security 
    await verify(ctx)

    const d = ctx.db
    const tweetId = await createTweet(d, args.tweet)
    return tweetId
  },
});

//no actions

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

function getTweets(db: GenericDatabaseReader<any>, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{
  return filter(db.query("tweets"), fltr ? fltr : () => true)
}
async function createTweet(db: GenericDatabaseWriter<any>, data: {[x: string]: any;}){return await db.insert("tweets", data);}
async function updateTweet(db: GenericDatabaseWriter<any>, id: Id<"tweets">, data: Partial<any>){return await db.patch(id, data);}
async function deleteTweet(db: GenericDatabaseWriter<any>, id: Id<"tweets">){return await db.delete(id);}