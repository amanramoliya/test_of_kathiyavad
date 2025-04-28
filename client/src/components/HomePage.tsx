import { CardCarousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { Cards } from "@/components/items/Cards";
import { OrderAtom } from "@/components/items/_state/order.atom";
import { useGetItems } from "@/components/items/query/use-get-items";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [order] = useAtom(OrderAtom);
  const { data: items = [] } = useGetItems();

  // Calculate order total
  const calculateTotal = () => {
    return Object.entries(order).reduce((total, [itemId, quantity]) => {
      const item = items.find((i) => i.id === Number(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  // Filter out items with quantity 0
  const orderItems = items.filter((item) => order[item.id] > 0);

  const handleConfirmOrder = () => {
    // Here you would implement order submission logic
    console.log("Order confirmed:", order);
    // Reset order or navigate to confirmation page
    onClose();
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
    >
      <Header />
      <Stack pt={"7rem"} w={"100%"}>
        <CardCarousel cards={carouselElements} />
      </Stack>
      <Cards />

      {/* Order Button */}
      <Box
        position="sticky"
        bottom="0"
        width="100%"
        p={4}
        bg="white"
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      >
        <Button
          colorScheme="green"
          size="lg"
          width="100%"
          onClick={onOpen}
          isDisabled={Object.values(order).every((qty) => qty === 0)}
        >
          Place Order
        </Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", sm: "md", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
            Confirm Your Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {orderItems.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple" size={{ base: "sm", md: "md" }}>
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Price</Th>
                      <Th>Qty</Th>
                      <Th isNumeric>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orderItems.map((item) => (
                      <Tr key={item.id}>
                        <Td fontSize={{ base: "xs", md: "sm" }}>{item.name}</Td>
                        <Td fontSize={{ base: "xs", md: "sm" }}>
                          ₹{item.price}
                        </Td>
                        <Td fontSize={{ base: "xs", md: "sm" }}>
                          {order[item.id]}
                        </Td>
                        <Td isNumeric fontSize={{ base: "xs", md: "sm" }}>
                          ₹{item.price * order[item.id]}
                        </Td>
                      </Tr>
                    ))}
                    <Tr fontWeight="bold">
                      <Td colSpan={3} fontSize={{ base: "sm", md: "md" }}>
                        Total Amount
                      </Td>
                      <Td isNumeric fontSize={{ base: "sm", md: "md" }}>
                        ₹{calculateTotal()}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Text>Your order is empty. Please add items to your cart.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              size={{ base: "sm", md: "md" }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleConfirmOrder}
              isDisabled={orderItems.length === 0}
              size={{ base: "sm", md: "md" }}
            >
              Confirm Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
