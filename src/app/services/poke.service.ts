import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonApi } from '../interfaces/pokemon';
import { PokemonSpecies } from '../interfaces/pokemonSpecies';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PokemonService {

  private apiUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonDetails(id: string): Observable<PokemonApi> {
    return this.http.get<PokemonApi>(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonSpecie(id: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.apiUrl}/pokemon-species/${id}`);
  }

  getEvolutionChain(url: string): Observable<any> {
    return this.http.get(url);
  }

}
