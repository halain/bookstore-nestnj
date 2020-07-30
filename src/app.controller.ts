import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private confgiService: ConfigService) {
    console.log(this.confgiService.get('DATABASE_USER'));
    
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
