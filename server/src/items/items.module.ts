import { Module } from '@nestjs/common';
import { GoogleSheetsModule } from 'src/google-sheet/google-sheet.module';
import { ItemsController } from 'src/items/items.controller';
import { ItemsService } from 'src/items/items.service';
@Module({
  imports: [GoogleSheetsModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
