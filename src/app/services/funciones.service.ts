import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionsService {
    constructor() { }

    public variable$ = new BehaviorSubject<string>('');

    public start = new BehaviorSubject<number>(0);
    public end = new BehaviorSubject<number>(0);

    public cargando = new BehaviorSubject<boolean>(true);
}