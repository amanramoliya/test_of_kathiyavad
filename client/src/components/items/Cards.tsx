import { OrderAtom } from "@/components/items/_state/order.atom";
import { useGetItems } from "@/components/items/query/use-get-items";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

export const Cards = () => {
  const { data: items = [] } = useGetItems();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [order, setOrder] = useAtom(OrderAtom);

  const cardsPerPage =
    useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }) || 1;

  const totalPages = Math.ceil((items?.length || 0) / cardsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handleIncrement = (itemId: number) => {
    setOrder((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId: number) => {
    setOrder((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const currentItems = items?.slice(
    currentIndex * cardsPerPage,
    currentIndex * cardsPerPage + cardsPerPage
  );

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      position="relative"
      py={10}
    >
      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon boxSize={6} />}
        position="absolute"
        left="2"
        zIndex="1"
        onClick={handlePrevious}
        isDisabled={currentIndex === 0}
        size="md"
        colorScheme="gray"
        variant="ghost"
        _hover={{ bg: "transparent" }}
      />

      <SimpleGrid
        columns={{
          base: 1,
          sm: Math.min(2, cardsPerPage),
          md: Math.min(3, cardsPerPage),
          lg: Math.min(4, cardsPerPage),
        }}
        w="90%"
        gap={4}
        mx="auto"
        py={4}
      >
        {currentItems?.map((item, idx) => (
          <Flex
            key={idx}
            direction="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            border="1px solid black"
            p={4}
            borderRadius="md"
            boxShadow="sm"
          >
            <h1>{item.name}</h1>
            <h1>{item.price} rs/- Kg</h1>
            <h1>{item.description}</h1>

            <HStack mt={4} spacing={2} width="100%" justify="center">
              <IconButton
                size="sm"
                colorScheme="red"
                aria-label="Decrease quantity"
                icon={<MinusIcon />}
                onClick={() => handleDecrement(item.id || idx)}
                isDisabled={(order[item.id || idx] || 0) === 0}
              />

              <Box
                px={3}
                py={1}
                minWidth="40px"
                textAlign="center"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              >
                <Text fontSize="md">{order[item.id || idx] || 0}</Text>
              </Box>

              <IconButton
                size="sm"
                colorScheme="green"
                aria-label="Increase quantity"
                icon={<AddIcon />}
                onClick={() => handleIncrement(item.id || idx)}
              />
            </HStack>
          </Flex>
        ))}
      </SimpleGrid>

      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon boxSize={6} />}
        position="absolute"
        right="2"
        zIndex="1"
        onClick={handleNext}
        isDisabled={currentIndex >= totalPages - 1}
        size="md"
        colorScheme="gray"
        variant="ghost"
        _hover={{ bg: "transparent" }}
      />
    </Flex>
  );
};
