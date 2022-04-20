import { Box, Flex } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box>
          <Box padding="20px" lineHeight="40px" color="gray.300">
            <Text fontSize="xs" fontWeight="bold" casing="uppercase">
              {subtitle}
            </Text>
            <Text fontSize="6xl">{title}</Text>
            <Text fontSize="xs" fontWeight="100">
              {description}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
