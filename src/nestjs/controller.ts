import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './service';

@Controller('get-pools')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('t')
  test(@Query('protocol') protocol:any): string {
    return this.appService.test();
  }

  @Get()
  findAll(@Query('protocol') protocol:any): Promise<void> {
    return this.appService.getPools(protocol);
  }
}
