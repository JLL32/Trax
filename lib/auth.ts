import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies["TRAX-ACCESS-TOKEN"];
    if (token) {
      let user: User;
      try {
        const { id } = jwt.verify(token, "hello") as any;
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw Error("Not real user");
      } catch (e) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};
