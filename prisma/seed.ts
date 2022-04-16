import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("password", salt),
    },
  });

  const songs = await prisma.song.findMany({});

  // NOTE: we used upsert so each time we run seed command the data won't be duplicated
  // NOTE: We're not doing upsert because playlist doesn't have something unique other than
  // the id which we dont have for the moment
  await Promise.all(
    Array(10)
      .fill(1)
      .map(async (_, i) => {
        return prisma.playlist.create({
          data: {
            name: `Playlist #${i + 1}`,
            user: {
              connect: { id: user.id },
            },
            songs: {
              connect: songs.map((song) => ({
                id: song.id,
              })),
            },
          },
        });
      })
  );
};

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
