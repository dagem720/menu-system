import { Module } from '@nestjs/common';
import { TopMenuController } from './top-menu.controller';
import { TopMenuService } from './top-menu.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TopMenuController],
  providers: [TopMenuService],
  imports: [PrismaModule],
  exports: [TopMenuService],
})
export class TopMenuModule {}
