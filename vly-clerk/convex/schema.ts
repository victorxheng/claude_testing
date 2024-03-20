import { Table } from "convex-helpers/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export const User = Table("users", {
  email: v.string(),
  username: v.string(),
  name: v.string(),  
  bio: v.string(),
  profileImageUrl: v.string(),
  tokenIdentifier: v.string(),//ADDED AFTER
});

export const Tweets = Table("tweets",{
  content: v.string(),
  author: v.id("users"),
  createdAt: v.number(),
})


export default defineSchema(
  {
    documents: defineTable({
      fieldOne: v.string(),
      fieldTwo: v.object({
        subFieldOne: v.array(v.number()),
      }),
    }),
    // This definition matches the example query and mutation code:
    numbers: defineTable({
      value: v.number(),
    }),
    users: User.table.index("by_token", ["tokenIdentifier"]),
  },

  { schemaValidation: true }
);
