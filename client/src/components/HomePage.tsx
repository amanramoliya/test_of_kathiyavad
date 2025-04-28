import { CardCarousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { Cards } from "@/components/items/Cards";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

const carouselElements = [
  <Box key={1} px={16} py={6} bg="yellow.100" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Rajwadi Mango Shrikhand
    </Text>
  </Box>,
  <Box key={2} px={16} py={6} bg="pink.100" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Rajwadi Gulkand Shrikhand
    </Text>
  </Box>,
  <Box key={3} px={16} py={6} bg="yellow.200" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Kesar Mango Ras
    </Text>
  </Box>,
  <Box key={3} px={16} py={6} bg="yellow.300" rounded="lg" height={"300px"}>
    <Text fontSize="xl" fontWeight="bold">
      Hafus Mango Ras
    </Text>
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
        <CardCarousel cards={carouselElements} />
      </Stack>
      <Cards></Cards>
    </Flex>
  );
};
