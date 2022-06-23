import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './service';

@Controller('get-pools')
export class AppController {
  constructor(private readonly appService: AppService) {
    appService = new AppService();
  }

  @Get()
  findAll(@Query('protocol') protocol: any): Promise<void> {
    console.log('protocol :', protocol);
    console.log('return :', this.appService.getPools(protocol));
    return this.appService.getPools(protocol);
  }
}
