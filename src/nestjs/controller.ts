import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './service';

@Controller('get-pools')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async findAll(@Query('protocol') protocol: string) {
    let dex = protocol.split(',');
    this.appService.getPools(dex)
    .then((data)=>{
      console.log('data',data)
      return data;
    }).catch((err)=>{
      console.log('controller error: ' + err)
    });
  }
}
