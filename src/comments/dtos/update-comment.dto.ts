import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
