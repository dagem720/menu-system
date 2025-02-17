import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly MenuService: MenuService) {}

  @Post()
  @ApiCreatedResponse({ type: MenuEntity })
  create(@Body() CreateMenuDto: CreateMenuDto) {
    return this.MenuService.createMenu(CreateMenuDto);
  }

  @Get('menu-id/:menuId')
  @ApiOkResponse({ type: MenuEntity, isArray: true })
  findBymenuId(@Param('menuId', ParseIntPipe) menuId: number) {
    return this.MenuService.findBymenuId(menuId);
  }
  @Get()
  @ApiOkResponse({ type: MenuEntity, isArray: true })
  findAll() {
    return this.MenuService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MenuEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.MenuService.findOne(id);
  }

  @Get(':path/descendants')
  async getDescendants(@Param('path') path: string) {
    return this.MenuService.getDescendants(path);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: MenuEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateMenuDto: UpdateMenuDto,
  ) {
    return this.MenuService.update(id, UpdateMenuDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MenuEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.MenuService.remove(id);
  }
}
