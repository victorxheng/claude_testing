import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/convex-lucia-auth";
import { v } from "convex/values";
import { Table } from "convex-helpers/server";


export const Recipes = Table("recipes", {
  name: v.string(),
  course: v.union( 
    v.literal("appetizer"),
    v.literal("main"),
    v.literal("dessert")
  ),
  ingredients: v.array(v.string()),
  steps: v.array(v.string()),
});

export const User = Table("users", {
  email: v.string(),
  username: v.string(),
  name: v.string(),
  bio: v.string(),
  profileImageUrl: v.string(),
});

export const Tweets = Table("tweets",{
  content: v.string(),
  author: v.id("users"),
  createdAt: v.number(),
})

export const follows = Table("follows", {
  follower: v.id("users"),
  following: v.id("users"),
});

export const Likes = Table("likes", {
  user: v.id("users"),
  tweet: v.id("tweets"),
});

export const Retweets = Table("retweets", {
  user: v.id("users"),
  tweet: v.id("tweets"),
});

 
export default defineSchema(
  {
    ...authTables({
      user: User.systemFields,
      session: {},
    }),
    numbers: defineTable({
      value: v.number(),
    }),
    tweets: Tweets.table,
    follows: follows.table,
    likes: Likes.table,
    retweets: Retweets.table,
  },
  { schemaValidation: true }
);


  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!