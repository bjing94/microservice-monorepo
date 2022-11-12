import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RMQModule } from 'nestjs-rmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import getJwtConfiguration from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJwtConfiguration()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
