import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleSheetsModule } from 'src/google-sheet/google-sheet.module';
import { ItemsModule } from 'src/items/items.module';
import { OrderModule } from 'src/order/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ItemsModule,
    OrderModule,
    GoogleSheetsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
