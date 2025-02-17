import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { TopMenuService } from 'src/top-menu/top-menu.service';

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private topMenuService: TopMenuService,
  ) {}

  async createMenu(data: CreateMenuDto) {
    const { name, parentId, topMenuId } = data;

    let path = 'root'; // Default path for root nodes
    if (parentId) {
      const parent = await this.prisma.menu.findUnique({
        where: { id: parentId },
      });

      if (!parent) {
        throw new Error('Parent not found');
      }

      const siblings = await this.prisma.menu.findMany({
        where: {
          parentId: parentId,
        },
      });

      const nextIndex = siblings.length + 1;
      path = `${parent.path}.${nextIndex}`;
    }

    return this.prisma.menu.create({
      data: {
        name,
        path,
        parentId,
        topMenuId,
      },
    });
  }

  async getDescendants(path: string) {
    return this.prisma.menu.findMany({
      where: {
        path: {
          startsWith: path,
        },
      },
    });
  }

  findAll() {
    return this.prisma.menu.findMany();
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  update(id: number, UpdateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: UpdateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({ where: { id } });
  }

  async findBymenuId(id: number) {
    const menu = await this.prisma.menu.findMany({
      where: {
        topMenuId: id,
      },
    });

    if (menu.length === 0) {
      const topMenu = await this.topMenuService.findOne(id);
      if (!topMenu) {
        throw new Error('Menu not found');
      }
      const rootMenu = await this.createMenu({
        name: topMenu.name,
        topMenuId: id,
        parentId: null,
      });

      return [rootMenu];
    }
    return menu;
  }
}
