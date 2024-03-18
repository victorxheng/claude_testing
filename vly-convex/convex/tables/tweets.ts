import { crud } from "convex-helpers/server";
import { Tweets } from "../schema";
import { mutation, query } from "../_generated/server";

export const { create, read, paginate, update, destroy } = crud(
    Tweets,
    query,
    mutation
  );