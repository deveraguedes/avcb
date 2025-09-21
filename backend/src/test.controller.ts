import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  getTest() {
    return { 
      message: 'API funcionando!', 
      timestamp: new Date().toISOString(),
      status: 'ok' 
    };
  }

  @Get('ping')
  ping() {
    return { pong: true };
  }
}
