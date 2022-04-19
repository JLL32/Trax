import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";

export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user: User) => {
    res.json(user);
  }
);
