import { Flex, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
      border={"1px solid black"}
      p={4}
    >
      <Text
        as={"h3"}
        fontSize={"xl"}
        fontWeight={"bold"}
        fontFamily={"cursive"}
        color={"blue.500"}
      >
        Welcome to the Test of Kathiyavad
      </Text>
    </Flex>
  );
};
