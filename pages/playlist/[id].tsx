import { FC } from "react";
import { Playlist as PlaylistType } from "@prisma/client";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const Playlist: FC<{ playlist: PlaylistType }> = ({ playlist }) => {
  return <p>{playlist.name}</p>;
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies["TRAX-ACCESS-TOKEN"]) as any;
  const playlist = await prisma.playlist.findFirst({
    where: { id: Number(query.id), userId: id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
