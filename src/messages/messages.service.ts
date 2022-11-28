import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsMessage } from 'src/app.constant';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private userRepository: Repository<MessageEntity>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const messageCreated = this.userRepository.create(createMessageDto);
    if (messageCreated) {
      const message = await this.userRepository.save(messageCreated);
      return message;
    }
    throw new HttpException(
      ExceptionsMessage.BAD_REQUEST,
      StatusCodes.BAD_REQUEST,
    );
  }

  async findAll() {
    const messages = await this.userRepository.find();
    return messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
