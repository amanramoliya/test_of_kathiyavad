"use client";

import { PropsBaseType } from "@/app/types/propsBase";
import { ChakraProvider } from "@chakra-ui/react";


export default function RootProviders({ children }: Readonly<PropsBaseType>) {
	return (
		<ChakraProvider>
				
								{children}
							
		</ChakraProvider>
	);
}
