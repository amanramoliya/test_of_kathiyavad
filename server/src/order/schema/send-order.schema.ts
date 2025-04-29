import zod from 'zod';

export const OrderItemSchema = zod.object({
  id: zod.number(),
  name: zod.string(),
  quantity: zod.number().int().positive(),
  price: zod.number().positive(),
});

export const CustomerSchema = zod.object({
  name: zod.string().min(1, 'Name is required'),
  mobile: zod.string().length(10, 'Mobile number must be 10 digits'),
  address: zod.string().min(1, 'Address is required'),
});

export const SendOrderSchema = zod.object({
  items: zod
    .array(OrderItemSchema)
    .nonempty('Order must contain at least one item'),
  total: zod.number().nonnegative(),
  customer: CustomerSchema,
});

export type OrderItem = zod.infer<typeof OrderItemSchema>;
export type Customer = zod.infer<typeof CustomerSchema>;
export type CreateOrderRequest = zod.infer<typeof SendOrderSchema>;
