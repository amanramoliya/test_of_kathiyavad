import { Module } from '@nestjs/common';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
