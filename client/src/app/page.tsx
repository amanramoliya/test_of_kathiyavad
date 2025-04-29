"use client";
import { HomePage } from "@/components/HomePage";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w={"100%"} direction={"column"} py={4}>
      <HomePage></HomePage>
    </Flex>
  );
}
