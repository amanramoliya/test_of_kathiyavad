import { Controller, Get } from '@nestjs/common';
import { ItemsService } from 'src/items/items.service';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems(): Promise<any[]> {
    return await this.itemsService.getItems();
  }
}
