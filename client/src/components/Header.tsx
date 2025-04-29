import { Flex, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      position={"fixed"}
      py={5}
      height={"auto"}
      top={0}
      left={0}
      w={"100%"}
      zIndex={1000}
      bg={"white"}
      boxShadow={"0 2px 5px rgba(0,0,0,0.1)"}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
        border={"1px solid black"}
        p={4}
        position={"fixed"}
        top={5}
        left={0}
        zIndex={1000}
        bg={"white"}
        mb={5}
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
    </Flex>
  );
};
