import Head from "next/head";
import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import GradientLayout from "../components/gradientLayout";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }: { artists: Artist[] }) => {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      color="green"
      subtitle="profile"
      title={user?.firstName}
      description={`${user?.playlistsCount} public playlists`}
      image="https://avatars.githubusercontent.com/u/26872714?v=4"
      roundImage
    >
      <Box color="gray.200" paddingX="15px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box
                bg="gray.900"
                borderRadius="4px"
                padding="15px"
                width="100%"
                height="100%"
              >
                <Image
                  src="http://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="l">{artist.name}</Text>
                  <Text fontSize="xs">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () =>
  prisma.artist.findMany({}).then((artists) => ({
    props: {
      artists,
    },
  }));

export default Home;
