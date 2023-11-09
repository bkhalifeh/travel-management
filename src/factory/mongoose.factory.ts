import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export function mongooseFactory(
    configService: ConfigService,
): MongooseModuleOptions {
    const dbUser: string = configService.get<string>('DB_USER');
    const dbPass: string = configService.get<string>('DB_PASS');

    let mongoUri: string = configService.get<string>('DB_SCHEMA');

    if (dbUser && dbPass) {
        mongoUri += `${dbUser}:${dbPass}@`;
    }

    mongoUri += configService.get<string>('DB_HOST');

    const dbPort: number = configService.get<number>('DB_POST');
    if (Number.isSafeInteger(dbPort)) {
        mongoUri += `:${dbPort}`;
    }

    mongoUri += '/';
    mongoUri += configService.get<string>('DB_NAME');

    return {
        uri: mongoUri,
    };
}
