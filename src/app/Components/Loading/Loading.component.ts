import { FuncionsService } from './../../services/funciones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './Loading.component.html',
  styleUrls: ['./Loading.component.css'],
})
export class LoadingComponent implements OnInit {

  cargando: boolean = true;

  constructor(private func: FuncionsService) { }

  ngOnInit(): void {
    this.cargandoTemplate();
  }

  cargandoTemplate() {
    setTimeout(() => {
      this.cargando = false;
      this.func.cargando.next(this.cargando);
    }, 500);
  }

}
