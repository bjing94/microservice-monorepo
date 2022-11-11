import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';

export default function getMongoConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      uri: getMongoString(configService),
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
}

const getMongoString = (configService: ConfigService) => {
  console.log(
    'mongodb://' +
      configService.get('MONGO_LOGIN') +
      ':' +
      configService.get('MONGO_PASSWORD') +
      '@' +
      configService.get('MONGO_HOST') +
      ':' +
      configService.get('MONGO_PORT') +
      '/' +
      '?authMechanism=DEFAULT'
  );
  return (
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    '?authMechanism=DEFAULT'
  );
};
