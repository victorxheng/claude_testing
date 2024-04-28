
import { v } from "convex/values";
import { mutation, action, query, internalQuery, DatabaseReader, DatabaseWriter } from "./_generated/server";
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
async function createOneUsers(db: DatabaseWriter, data: typeof Users.doc.type){return await db.insert("users", data);}

//creates one document based on data object, returns the resulting document id
async function createOneTweets(db: DatabaseWriter, data: typeof Tweets.doc.type){return await db.insert("tweets", data);}

//creates one document based on data object, returns the resulting document id
async function createOneFollows(db: DatabaseWriter, data: typeof Follows.doc.type){return await db.insert("follows", data);}

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
