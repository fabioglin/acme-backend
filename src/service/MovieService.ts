import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map, lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Movie } from 'src/model/Movie';

@Injectable()
export class MovieService {
  private omdbApiKey: string;
  private omdbApiURL: string;

  constructor(private readonly httpService: HttpService) {
    this.omdbApiKey = process.env.OMDb_API_KEY;
    this.omdbApiURL = process.env.OMDb_API_URL;
    if (!this.omdbApiKey) {
      throw new Error('NO API KEY PROVIDED');
    }
    if (!this.omdbApiURL) {
      throw new Error('NO API URL PROVIDED');
    }
  }

  _fetchMovieByTitle(title: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(this.omdbApiURL, {
      params: {
        t: title,
        apikey: this.omdbApiKey,
      },
    });
  }

  async searchMovieByTitle(title: string): Promise<Movie> {
    const response = this._fetchMovieByTitle(title).pipe(
      map((response: AxiosResponse<any>) => {
        if (response.data) {
          if (response.data.Response == 'False') {
            return null;
          }
          return {
            title: response.data.Title,
            year: response.data.Year,
            poster: response.data.Poster,
            genre: response.data.Genre,
          };
        }
        return null;
      }),
    );

    const movie = await lastValueFrom(response);
    return movie;
  }
}
