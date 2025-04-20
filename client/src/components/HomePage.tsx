import { CardCarousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const cards = [
  <Box key={1} px={16} py={6} bg="teal.100" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Card 1
    </Text>
    <Text>This is the first card.</Text>
  </Box>,
  <Box key={2} px={16} py={6} bg="pink.100" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Card 2
    </Text>
    <Text>This is the second card.</Text>
  </Box>,
  <Box key={3} px={16} py={6} bg="yellow.100" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Card 3
    </Text>
    <Text>This is the third card.</Text>
  </Box>,
];

export const HomePage = () => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
    >
      <Header />
      <Stack py={10} w={"100%"}>
        <CardCarousel cards={cards} />
      </Stack>
    </Flex>
  );
};
