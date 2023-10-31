import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonApi } from '../interfaces/pokemon';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class PokemonService {

  public pokemon: PokemonApi[] = [];

  private apiUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  async getPokemon(index: number) {
    return this.http.get<PokemonApi>(`${this.apiUrl}pokemon/${index}`)
  }
  

  /* async getPokemon(): Promise<PokemonApi[]> {
    const res = await fetch(this.apiUrl);
    const resJson = await res.json();
    if (resJson.results.length > 0) return resJson.results
    return [];
  } */

  getById() {

  }

}