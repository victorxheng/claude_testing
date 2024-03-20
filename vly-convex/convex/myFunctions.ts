import { v } from "convex/values";
import { mutation, action, query, internalQuery } from "./_generated/server";
import { api } from "./_generated/api";
import { queryWithAuth } from "@convex-dev/convex-lucia-auth";
import { crud } from "convex-helpers/server";
import schema, { Tweets, User } from "./schema";
import { Predicate, filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer } from "convex/server";
import { useMutation, useQuery } from "convex/react";

 
// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const listNumbers = queryWithAuth({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  // Query implementation.
  handler: async (ctx, args) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    const numbers = await ctx.db
      .query("numbers")
      // Ordered by _creationTime, return most recent
      .order("desc")
      .take(args.count);
    return {
      viewer: ctx.session?.user.email,
      numbers: numbers.toReversed().map((number) => number.value),
    };
  },
});

//generic get
/**
 * TO USE:
 * tweets = useQuery(api.myFunctions.get, {(ctx) => {
 *    // FOR ONE
 *    return await ctx.db.get(id); 
 *    // FOR MANY
 *    return await filter(ctx.db.query("tweets"), 
 *        (tweet: typeOf Tweets.doc.types) => tweet.author == user._id)
 *        .first()
 * }})
 * 
 * To wrap even further, helper:
 * 
 * //generic get with context
 * const get = (f: (ctx: GenericQueryCtx<any>) => QueryInitializer<any>) => useQuery(api.myFunctions.get, {(ctx) => {
 *    return await f(ctx)
 * }})
 * 
 * //generic get without context
 * 
 * 
 * //tweet specific filter get
 * const getTweets = (fltr: (f: Tweets.doc.type) => boolean) =>  {
 *    return await f(filter(ctx.db.query("tweets"), fltr))
 * })
 * 
 * 
 * On the frontend:
 * tweets = get((ctx) => filter(ctx.db.query("tweets"), (c) => c.author == user._id).first())
 * tweets = get(getTweets((c) => c.author == user._id).first())
 */

export const get = query({
  handler: (ctx, args:{ q: (ctx: GenericQueryCtx<any>) => Promise<DocumentByInfo<GenericTableInfo>[]>  }) => {
    return args.q(
      ctx
    )
  },
});


// in the front end under lib/functions
export function getMainFeedFrontEnd() {return useQuery(api.myFunctions.getMainFeed, {})}

// in the back end under convex/myFunctions
export const getMainFeed = query({
  args: {

  },
  handler: async (ctx, args): Promise<DocumentByInfo<GenericTableInfo>[]> => {
    //security 
    await verify(ctx.auth)

    const d = ctx.db
    return getTweets(d).collect()
  },
});

async function verify(auth: Auth){
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call");
  }
}
function getTweets(db: GenericDatabaseReader<any>, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{
  return filter(db.query("tweets"), fltr ? fltr : () => true)
}
function getTweetsAll(db: GenericDatabaseReader<any>, order: "asc" | "desc" = "asc",  fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): Promise<DocumentByInfo<GenericTableInfo>[]>{
  return filter(db.query("tweets"), fltr ? fltr : () => true).order(order).collect()
}
function getTweetsFirst(db: GenericDatabaseReader<any>, order: "asc" | "desc" = "asc",  fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): Promise<DocumentByInfo<GenericTableInfo>[]>{
  return filter(db.query("tweets"), fltr ? fltr : () => true).order(order).first()
}
async function getTweetsPaginate(db: GenericDatabaseReader<any>, order: "asc" | "desc" = "asc",  opts: PaginationOptions, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): Promise<PaginationResult<any>>{
  return filter(db.query("tweets"), fltr ? fltr : () => true).order(order).paginate(opts)
}
function getTweetsAmount(db: GenericDatabaseReader<any>, order: "asc" | "desc" = "asc",  n: number, fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): Promise<DocumentByInfo<GenericTableInfo>[]>{
  return filter(db.query("tweets"), fltr ? fltr : () => true).order(order).take(n)
}
function getTweetsUnique(db: GenericDatabaseReader<any>, order: "asc" | "desc" = "asc",  fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): Promise<DocumentByInfo<GenericTableInfo>[]>{
  return filter(db.query("tweets"), fltr ? fltr : () => true).order(order).unique()
}
function getTweet(db: GenericDatabaseReader<any>, id: string | Id<"tweets">): Promise<DocumentByInfo<GenericTableInfo>[]>{ //returns Promise
  return db.get(id as Id<"tweets">)
}

// TO DO: REMEMBER TO TRACK LINKS IN THE DOC
// implement proper auth verification and saving of users in the database
// implement indexing operations of the database (later)
// make the ai create schemas
// develop for create, update, and delete, and actions
// make the ai create the back end calls
// make the ai create new back end query calls based on front end needs


function getUsers(db: GenericDatabaseReader<any>, fltr: (f: typeof User.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{ //returns QueryBuilder
  return filter(db.query("users"), fltr)
}
function getUser(db: GenericDatabaseReader<any>, id: string | Id<"users">): Promise<DocumentByInfo<GenericTableInfo>[]>{ //returns Promise
  return db.get(id as Id<"users">)
}


class Query{
  db: GenericDatabaseReader<any>;
  constructor(db: GenericDatabaseReader<any>){
      this.db = db;
  }
  getTweets(fltr?: (f: typeof Tweets.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{ //returns QueryBuilder
      return filter(this.db.query("tweets"), fltr ? fltr : () => true)
  }
  getTweet(id: string | Id<"tweets">){ //returns Promise
      return this.db.get(id as Id<"tweets">)
  }
  getUsers(fltr: (f: typeof User.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{ //returns QueryBuilder
      return filter(this.db.query("users"), fltr)
  }
  getUser(id: string | Id<"users">){ //returns Promise
      return this.db.get(id as Id<"users">)
  }
}



//helper function: export function getTweets(userId){ useQuery(api.myFunctions.getTweets, {id: userId })}


export const getTestTweets = query({
  handler: async (ctx, args:{ id: string  }) => {
    const q = new Query(ctx.db)
    return q.getTweets(
          async (tweet) => 
              tweet.author == await q.getUsers(
            (author) => author.name == "Sam"
          )
            .unique()
    )
    .collect()
  },
});

/**
 * data = useQuery(api.myFunctions.getNumbers, {(query, ctx) => {
 *    return await filter(query, 
 *        (tweet: typeOf Tweets.doc.types) => tweet.author == user._id)
 *        .first()
 * }})
 *  
 * */ 
/*
export const getTweets = query({
  handler: async (ctx, args:{ filter: (n: QueryInitializer<any>, ctx?: GenericQueryCtx<any>) => QueryInitializer<any>  }) => {
    return args.filter(
      ctx.db.query("tweets"),
      ctx
    )
  },
});*/

// You can write data to the database via a mutation:
export const addNumber = mutation({
  // Validators for arguments.
  args: {
    value: v.number(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const id = await ctx.db.insert("numbers", { value: args.value });

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const myAction = action({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    //// Use the browser-like `fetch` API to send HTTP requests.
    //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    // const response = await ctx.fetch("https://api.thirdpartyservice.com");
    // const data = await response.json();

    //// Query data by running Convex queries.
    const data = await ctx.runQuery(api.myFunctions.listNumbers, {
      count: 10,
      sessionId: null,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.myFunctions.addNumber, {
      value: args.first,
    });
  },
});

