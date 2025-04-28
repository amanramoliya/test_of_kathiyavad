"use client";

import { PropsBaseType } from "@/types/propsBase";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootProviders({ children }: Readonly<PropsBaseType>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}
