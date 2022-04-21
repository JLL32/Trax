import { FC } from "react";
import { Playlist as PlaylistType, Song } from "@prisma/client";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";

const getBGcolor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist: FC<{ playlist: PlaylistType & { songs: Song[] } }> = ({
  playlist,
}) => {
  const color = getBGcolor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?=random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const user = validateToken(req.cookies["TRAX-ACCESS-TOKEN"]) as any;
  if (!user)
    return {
      redirect: {
        permanent: false,
        path: "/signin",
      },
    };

  const playlist = await prisma.playlist.findFirst({
    where: { id: Number(query.id), userId: user.id },
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
