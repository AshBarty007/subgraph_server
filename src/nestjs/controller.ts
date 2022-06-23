import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('test')
  test(): string {
    console.log('protocol :');
    console.log('return :', this.appService.test());
    return this.appService.test();
  }

  @Get('get-pools')
  findAll(@Query('protocol') protocol: any): Promise<void> {
    console.log('protocol :', protocol);
    console.log('return :', this.appService.getPools(protocol));
    return this.appService.getPools(protocol);
  }
}
