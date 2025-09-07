import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApplicationController {
  @Get('health')
  health() {
    return 'ok';
  }
}
