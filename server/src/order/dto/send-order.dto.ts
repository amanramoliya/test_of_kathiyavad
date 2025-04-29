import {
  CreateOrderRequest,
  Customer,
  OrderItem,
} from 'src/order/schema/send-order.schema';

export class OrderItemDto implements OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export class CustomerDto implements Customer {
  name: string;
  mobile: string;
  address: string;
}

export class SendOrderDto implements CreateOrderRequest {
  items: [OrderItemDto, ...OrderItemDto[]];
  total: number;
  customer: CustomerDto;
}
