import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  @ApiProperty({
    description: 'The unique identifier of the menu item',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The ltree path of the menu item (stored as a string)',
    example: 'root.1.2',
  })
  path: string;

  @ApiProperty({ description: 'The name of the menu item', example: 'Home' })
  name: string;

  @ApiProperty({ description: 'The ID of the parent menu item', example: 1 })
  parentId: number;

  @ApiProperty({ description: 'The ID of the parent menu item', example: 1 })
  topMenuId: number;

  @ApiProperty({
    description: 'The child menu items',
    type: () => [MenuEntity],
    required: false,
  })
  children?: MenuEntity[];

  @ApiProperty({
    description: 'The parent menu item (if any)',
    type: () => MenuEntity,
    required: false,
  })
  parent?: MenuEntity;
}
