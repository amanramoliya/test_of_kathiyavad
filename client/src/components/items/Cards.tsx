import { useGetItems } from "@/components/items/query/use-get-items";
import { Flex } from "@chakra-ui/react";

export const Cards = () => {
  const { data: items } = useGetItems();
  return (
    <Flex alignItems={"center"} justifyContent={"center"} w={"90%"} gap={4}>
      {items?.map((item) => {
        return (
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            border={"1px solid black"}
          >
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
            <h1>{item.description}</h1>
          </Flex>
        );
      })}
    </Flex>
  );
};
