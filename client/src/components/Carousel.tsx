// components/CardCarousel.tsx
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CardCarouselProps {
  cards: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export const CardCarousel = ({
  cards,
  autoPlay = true,
  interval = 3000,
}: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    const total = cards.length;
    setCurrentIndex((index + total) % total);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const id = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, interval);

    return () => clearInterval(id);
  }, [currentIndex, autoPlay, interval]);

  return (
    <Stack
      align="center"
      spacing={4}
      pos="relative"
      w={"full"}
      maxW="1000px"
      mx="auto"
    >
      <Box position="relative" w="full">
        {cards[currentIndex]}

        <Button
          onClick={() => goToSlide(currentIndex - 1)}
          position="absolute"
          width={"16px"}
          left={1}
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          variant="ghost"
          colorScheme="teal"
        >
          <ChevronLeftIcon boxSize={6} />
        </Button>

        <Button
          onClick={() => goToSlide(currentIndex + 1)}
          width={"16px"}
          position="absolute"
          right={1}
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          variant="ghost"
          colorScheme="teal"
        >
          <ChevronRightIcon boxSize={6} />
        </Button>
      </Box>

      <HStack>
        {cards.map((_, i) => (
          <Box
            key={i}
            w={3}
            h={3}
            bg={i === currentIndex ? "teal.500" : "gray.300"}
            borderRadius="full"
            cursor="pointer"
            onClick={() => goToSlide(i)}
          />
        ))}
      </HStack>
    </Stack>
  );
};
