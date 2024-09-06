import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

export const drizzleService = Symbol('drizzle-connection');
@Module({
  providers: [
    {
      provide: drizzleService,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseURL = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: databaseURL,
          ssl: true,
        });
        return drizzle(pool, { schema: schema }) as NodePgDatabase<
          typeof schema
        >;
      },
    },
  ],
  exports: [drizzleService],
})
export class DrizzleModule {}
