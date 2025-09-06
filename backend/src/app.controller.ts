import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health') health(): string {
    return 'ok';
  }

  @Get('/todos') todos() {
    return [
      { id: 1, title: 'Dockerize frontend' },
      { id: 2, title: 'Dockerize backend' },
    ];
  }
}
