import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionsService {
  constructor() { }

  public valorBusqueda = new BehaviorSubject<string>('');

  public nombre = new BehaviorSubject<string>('');
  public start = new BehaviorSubject<number>(0);
  public end = new BehaviorSubject<number>(0);

  setDetailsData(nombre: string, start: number, end: number) {
    this.nombre.next(nombre);
    this.start.next(start);
    this.end.next(end);
  }
}
