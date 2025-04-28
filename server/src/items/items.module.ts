import { Module } from '@nestjs/common';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items/items.service';
@Module({
  imports: [],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
