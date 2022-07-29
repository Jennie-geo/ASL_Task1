import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  clearDb() {
    //transaction is use to make sure that it is deleted in the order.
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}