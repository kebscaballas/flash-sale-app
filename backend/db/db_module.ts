import { Global, Module, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data_source';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }

        return AppDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class DbModule implements OnModuleDestroy {
  async onModuleDestroy() {
    if (AppDataSource.isInitialized) {
      return AppDataSource.destroy();
    }
  }
}
