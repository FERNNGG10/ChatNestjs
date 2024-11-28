import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { isUniqueConstraint } from 'src/shared/constraints/isUnique.constraint';
import { Message } from 'src/messages/entities/message.entity';
import { existConstraint } from 'src/shared/constraints/exist.constraint';
import { Room } from 'src/rooms/entities/room.entity';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        entities: [User,Message,Room],
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   name: 'mongodbconnection',
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mongodb',
    //     url: configService.get('MONGODB_URI'),
    //     database: configService.get('MONGODB_DATABASE'),
    //     entities: [Message],
    //     synchronize: true,
    //   }),
    // }),
    TypeOrmModule.forFeature([User,Message,Room]),
  
  ],
  providers: [isUniqueConstraint,existConstraint],
  exports: [isUniqueConstraint,existConstraint],
})
export class TypeormModule {}
