/*
A simple Twitter-like application that allows users to post tweets, follow other users, and view a timeline of tweets from followed users.

- User registration and login
- Posting tweets
- Following other users
- Timeline view of tweets from followed users
- User profile pages
- Searching for users and tweets
*/


import { Table } from "convex-helpers/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export const Users = Table("users", {
	username: v.string(), //The username of the user
	email: v.string(), //The email of the user
	name: v.string(), //The display name of the user
	bio: v.string(), //A short user bio
	tokenIdentifier: v.string(),
});

export const Tweets = Table("tweets", {
	userId: v.id('users'), //ID of the user who posted the tweet
	text: v.string(), //The text content of the tweet
});

export const Follows = Table("follows", {
	followerId: v.id('users'), //ID of the user doing the following
	followedId: v.id('users'), //ID of the user being followed
});


export default defineSchema({
	users: Users.table.index("by_token", ["tokenIdentifier"]),
	tweets: Tweets.table,
	follows: Follows.table,
  },
  { schemaValidation: true }
);