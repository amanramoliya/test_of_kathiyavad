import { Controller, Get } from "@nestjs/common";
import { Items } from "@prisma/client";
import { ItemsService } from "src/items/items.service";

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems(): Promise<Items[]> {
    return await this.itemsService.getItems();
  }
}