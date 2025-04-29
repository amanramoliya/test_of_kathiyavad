"use client";
import { HomePage } from "@/components/HomePage";
import { Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <Flex w={"100%"} direction={"column"} py={4}>
      <HomePage></HomePage>
    </Flex>
  );
}
