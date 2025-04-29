import { SendOrder } from "@/components/items/interfaces/send-order.interface";
import { sendOrderMutationKey } from "@/components/items/query/query-keys";
import { httpPost } from "@/lib/http/http-post";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const sendOrder = async (url: string, body: SendOrder) => {
  return httpPost<SendOrder, any>(url, body);
};

export const useSendOrder = () => {
  const toast = useToast();
  return useMutation({
    mutationKey: sendOrderMutationKey(),
    mutationFn: async (orderData: SendOrder) => {
      return sendOrder("http://localhost:5000/order/", orderData);
    },
    onSuccess: (data) => {
      console.log("Order placed successfully", data);
      toast({
        title: "Order sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending order",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });
};
