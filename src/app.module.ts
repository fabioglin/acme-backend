import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { MovieService } from './service/MovieService';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [MovieService],
})
export class AppModule {}
