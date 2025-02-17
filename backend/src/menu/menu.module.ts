import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopMenuModule } from 'src/top-menu/top-menu.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [PrismaModule, TopMenuModule],
})
export class MenuModule {}
