import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './service';

@Controller('get-pools')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Query('protocol') protocol:any): Promise<void> {
    return this.appService.getPools(protocol);
  }
}
