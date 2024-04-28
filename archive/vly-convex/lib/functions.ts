import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { GenericQueryCtx, QueryInitializer } from "convex/server";
import { Tweets, User } from "../convex/schema";
import { filter } from "convex-helpers/server/filter.js";
import { v } from "convex/values";
import { Id } from "@/convex/_generated/dataModel";


export const addNumber = useMutation(api.myFunctions.addNumber);




const get = (q: (q: Query) => Promise<any>) => {
    return useQuery(api.myFunctions.get,
        {
            q: (ctx) => {
                return q(new Query(ctx));
            }
        }
    )
}

export class Query{
    ctx: GenericQueryCtx<any>;
    constructor(ctx: GenericQueryCtx<any>){
        this.ctx = ctx;
    }
    getTweets(fltr: (f: typeof Tweets.doc.type) => boolean){ //returns QueryBuilder
        return filter(this.ctx.db.query("tweets"), fltr)
    }
    getTweet(id: string | Id<"tweets">){ //returns Promise
        return this.ctx.db.get(id as Id<"tweets">)
    }
    getUsers(fltr: (f: typeof User.doc.type) => boolean){ //returns QueryBuilder
        return filter(this.ctx.db.query("users"), fltr)
    }
    getUser(id: string | Id<"users">){ //returns Promise
        return this.ctx.db.get(id as Id<"users">)
    }
}


const tweets = get((q: Query) => 
    q.getTweets(
        (tweet) => 
            tweet.author == q.getUsers(
                (author) => author.name == "Sam"
            )
            .unique()
    )
    .collect()
)


