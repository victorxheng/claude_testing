
import { v } from "convex/values";
import { mutation, action, query, internalQuery, DatabaseReader, DatabaseWriter } from "./_generated/server";
import { api } from "./_generated/api";
import { filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer, WithoutSystemFields } from "convex/server";
import { useMutation, useQuery } from "convex/react";

import schema, { Users, Matches } from "./schema";


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
function getManyMatches(db: DatabaseReader, fltr?: (f: typeof Matches.doc.type) => Promise<boolean> | boolean){return filter(db.query("matches"), fltr ? fltr : () => true)}

//returns one document based on an id
async function getOneMatches(db: DatabaseReader, id: string | Id<"matches">){return await db.get(id as Id<"matches">)}

//creates one document based on data object, returns the resulting document id
async function createOneUsers(db: DatabaseWriter, data: WithoutSystemFields<typeof Users.doc.type>){return await db.insert("users", data);}

//creates one document based on data object, returns the resulting document id
async function createOneMatches(db: DatabaseWriter, data: WithoutSystemFields<typeof Matches.doc.type>){return await db.insert("matches", data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneUsers(db: DatabaseWriter, id: Id<"users">, data: Partial<any>){await db.patch(id, data);}

//updates one document based on an id and a partial data object, returns nothing
async function updateOneMatches(db: DatabaseWriter, id: Id<"matches">, data: Partial<any>){await db.patch(id, data);}

//deletes one document based on an id, returns nothing
async function deleteOneUsers(db: DatabaseWriter, id: Id<"users">){await db.delete(id);}

//deletes one document based on an id, returns nothing
async function deleteOneMatches(db: DatabaseWriter, id: Id<"matches">){await db.delete(id);}
