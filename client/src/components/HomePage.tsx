import { CardCarousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { Cards } from "@/components/items/Cards";
import { OrderAtom } from "@/components/items/_state/order.atom";
import { Order } from "@/components/items/interfaces/order.interface";
import { useGetItems } from "@/components/items/query/use-get-items";
import { useSendOrder } from "@/components/items/query/use-send-order";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const {
    isOpen: isUserDetailsOpen,
    onOpen: onOpenUserDetails,
    onClose: onCloseUserDetails,
  } = useDisclosure();
  const [order, setOrder] = useAtom<Order>(OrderAtom);
  const { data: items = [] } = useGetItems();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    mobile: "",
  });

  const resetUserDetails = () => {
    setUserDetails({
      name: "",
      mobile: "",
      address: "",
    });
    setErrors({
      mobile: "",
    });
  };

  const calculateTotal = () => {
    return Object.entries(order).reduce((total, [itemId, quantity]) => {
      const item = items.find((i) => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const orderItems = items.filter((item) => order[item.id] > 0);

  const { mutateAsync: sendOrder } = useSendOrder();

  const handleConfirmOrder = () => {
    onClose();
    onOpenUserDetails();
  };

  const handleUserDetailsChange = (e: any) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "mobile") {
      const cleanedValue = value.replace(/\D/g, "");

      setUserDetails((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));

      if (cleanedValue && cleanedValue.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile number must be 10 digits",
        }));
      }
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitOrder = async () => {
    console.log("Order submitted:", {
      items: orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: order[item.id],
        price: item.price,
      })),
      total: calculateTotal(),
      customer: userDetails,
    });

    await sendOrder({
      customer: userDetails,
      items: orderItems.map((item) => ({
        id: item.id,
        name: item.name,

        quantity: order[item.id],
        price: item.price,
      })),
      total: calculateTotal(),
    });

    onCloseUserDetails();
    resetUserDetails();
    setOrder({});
  };

  const handleCloseUserDetailsModal = () => {
    onCloseUserDetails();
    resetUserDetails(); // Clear the form when user cancels
  };

  const isFormComplete =
    userDetails.name &&
    userDetails.mobile &&
    userDetails.mobile.length === 10 &&
    userDetails.address;

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
        maxWidth={"400px"}
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

      <Modal
        isOpen={isUserDetailsOpen}
        onClose={handleCloseUserDetailsModal} // Use the new handler instead of onCloseUserDetails
        size={{ base: "sm", sm: "md", md: "md" }}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
            <Flex direction={"column"} gap={2}>
              <Flex justifyContent={"center"}>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                  fontStyle={"italic"}
                >
                  Thank you for your order!
                </Text>
              </Flex>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="normal"
                color="gray.600"
                textAlign="center"
              >
                Please enter your details
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={userDetails.name}
                  onChange={handleUserDetailsChange}
                  placeholder="Enter your full name"
                />
              </FormControl>

              <FormControl isRequired id="mobile" isInvalid={!!errors.mobile}>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  name="mobile"
                  value={userDetails.mobile}
                  onChange={handleUserDetailsChange}
                  placeholder="Enter your 10-digit mobile number"
                  type="tel"
                  maxLength={10}
                />
                {errors.mobile && (
                  <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired id="address">
                <FormLabel>Delivery Address</FormLabel>
                <Input
                  name="address"
                  value={userDetails.address}
                  onChange={handleUserDetailsChange}
                  placeholder="Enter your delivery address"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleCloseUserDetailsModal}
              size={{ base: "sm", md: "md" }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmitOrder}
              isDisabled={!isFormComplete}
              size={{ base: "sm", md: "md" }}
            >
              Submit Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
