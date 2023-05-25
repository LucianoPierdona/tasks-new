import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [TaskModule, LoggerModule.forRoot({
    
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
