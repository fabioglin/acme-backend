import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { MovieService } from './service/MovieService';

@Controller()
export class AppController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search')
  async searchMovies(@Query('title') title: string) {
    const movie = await this.movieService.searchMovieByTitle(title);
    if (movie == null) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
