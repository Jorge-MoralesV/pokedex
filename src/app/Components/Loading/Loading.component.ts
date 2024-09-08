import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './Loading.component.html',
  styleUrls: ['./Loading.component.css'],
})
export class LoadingComponent {

  cargando: boolean = true;

  constructor() { }

}
