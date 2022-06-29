import { Router } from "../../deps.ts";

import { save, findAll } from "../helpers/color.helpers.ts";

export const router = new Router()
  .get("/api/colors", findAll)
  .post("/api/colors", save);
