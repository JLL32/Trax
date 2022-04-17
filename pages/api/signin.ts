import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "@prisma/client/index";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "hello",
      {
        expiresIn: "8h",
      }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX-ACCESS-TOKEN", token, {
        httpOnly: true, // means not accessible using ather than http (like js in the browser)
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user);
    return;
  }

  res.status(401);
  res.json({ error: "Email or Password is wrong" });
}
