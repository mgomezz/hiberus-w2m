import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Hero } from '../../../shared/models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiURL}/heroes`);
  }

  searcHeroesByPartialName(partialName: string): Observable<Hero[]> {
    if (!partialName.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.apiURL}/heroes/${partialName}`);
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
