import { v } from "convex/values";
import { mutation, action, query, internalQuery } from "./_generated/server";
import { api } from "./_generated/api";
import { crud } from "convex-helpers/server";
import schema, { Tweets, User } from "./schema";
import { Predicate, filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer } from "convex/server";
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
    return getTweets(d).collect()
  },
});

async function verify(ctx: GenericQueryCtx<any>){
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    // Note: If you don't want to define an index right away, you can use
    // ctx.db.query("users")
    //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    //  .unique();
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
}

function getTweets(db: GenericDatabaseReader<any>, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{
  return filter(db.query("tweets"), fltr ? fltr : () => true)
}