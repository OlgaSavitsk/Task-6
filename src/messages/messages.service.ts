import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsMessage } from 'src/app.constant';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class MessagesService {
  clientToUser = {};
  constructor(
    @InjectRepository(MessageEntity)
    private userRepository: Repository<MessageEntity>,
  ) {}

  async identify(name: string, clientId: string) {
    const sendedMes = await this.findAll().then((messages) =>
      messages.filter((message) => message.name === name),
    );
    this.clientToUser[clientId] = name;
    const [...setNames] = new Set([
      ...(await this.getClientName()),
      ...Object.values(this.clientToUser),
    ]);
    return { sendedMes, setNames };
  }

  async getClientName() {
    const users = await this.findAll().then((messages) =>
      messages.map((message) => message.name),
    );
    return users;
  }

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const messageCreated = this.userRepository.create({
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
      title: createMessageDto.title,
      recipient: createMessageDto.recipient,
      createdAt: Date.now().toString(),
    });
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
}
