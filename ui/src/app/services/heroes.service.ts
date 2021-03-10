import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiURL}/heroes`);
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiURL}/hero/${id}`);
  }

  addHero(hero: Hero): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/hero`, { hero });
  }

  editHero(hero: Hero): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiURL}/hero`, { hero });
  }

  deleteHero(heroId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiURL}/hero/${heroId}`);
  }
}
