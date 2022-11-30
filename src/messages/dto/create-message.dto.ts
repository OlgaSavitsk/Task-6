import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  id?: number;
  @IsString({ message: 'The name must be a string' })
  name?: string;

  @IsString()
  title?: string;

  @IsNotEmpty({ message: 'The text cannot be empty' })
  text: string;

  @IsString()
  createdAt?: string;

  @IsString()
  @IsNotEmpty({ message: 'The field cannot be empty' })
  recipient: string;
}
