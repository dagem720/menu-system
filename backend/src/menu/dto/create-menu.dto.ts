import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({
    description: 'The name of the menu item',
    example: 'Home',
  })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the parent menu item (if any)',
    example: 1,
    required: false,
  })
  parentId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the top menu item (if any)',
    example: 1,
    required: true,
  })
  topMenuId?: number;
}
