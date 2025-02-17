import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopMenuService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.topMenu.findMany();
  }

  async findOne(id: number) {
    return this.prisma.topMenu.findUnique({
      where: { id },
    });
  }
}
