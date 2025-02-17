import { Controller, Get, Param } from '@nestjs/common';
import { TopMenuService } from './top-menu.service';

@Controller('top-menu')
export class TopMenuController {
  constructor(private readonly topMenuService: TopMenuService) {}

  @Get()
  async findAll() {
    return this.topMenuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.topMenuService.findOne(+id);
  }
}
