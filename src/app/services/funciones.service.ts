import { PokemonListComponent } from 'src/app/pages/pokemon-list/pokemon-list.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonApi } from '../interfaces/pokemon';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
    constructor() { }

    public variable$ = new BehaviorSubject<string>('');

    public start = new BehaviorSubject<number>(0);
    public end = new BehaviorSubject<number>(0);
}