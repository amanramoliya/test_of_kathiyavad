import { Injectable } from "@nestjs/common";
import { Items } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class ItemsService {
    constructor(private readonly prisma: PrismaService) {}
  async getItems(): Promise<Items[]> { 
    return await this.prisma.items.findMany();
  }
}