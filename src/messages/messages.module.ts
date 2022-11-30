import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
