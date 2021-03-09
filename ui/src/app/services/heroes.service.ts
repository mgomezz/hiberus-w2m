import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http.get<Hero[]>(`${this.apiURL}/heroes`);
  }

  getHero(id: number) {
    return this.http.get<Hero>(`${this.apiURL}/hero/${id}`);
  }

  addHero(hero: Hero) {
    return this.http.post(`${this.apiURL}/hero`, {hero});
  }

  editHero(id: number) {}

  deleteHero(id: number) {}
}
