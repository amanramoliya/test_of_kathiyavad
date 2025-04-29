import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/lib/pipes/zod.pipe';
import { SendOrderDto } from 'src/order/dto/send-order.dto';
import { OrderService } from 'src/order/order.service';
import { SendOrderSchema } from 'src/order/schema/send-order.schema';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async sendOrder(
    @Body(new ZodValidationPipe(SendOrderSchema, 'body'))
    request: SendOrderDto,
  ) {
    return await this.orderService.sendOrder(request);
  }
}
