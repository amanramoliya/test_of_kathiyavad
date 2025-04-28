import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { ItemsModule } from 'src/items/items.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ItemsModule, PrismaModule,ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
