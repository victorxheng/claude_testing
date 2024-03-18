import { crud } from "convex-helpers/server";
import { User } from "../schema";
import { mutation, query } from "../_generated/server";


export const { create, read, paginate, update, destroy } = crud(
  User,
  query,
  mutation
);
