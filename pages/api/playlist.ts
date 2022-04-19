import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";

export default validateRoute(
  async (_req: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlists = await prisma.playlist.findMany({
      where: { userId: user.id },
      orderBy: { name: "asc" },
    });
    res.json(playlists);
  }
);
