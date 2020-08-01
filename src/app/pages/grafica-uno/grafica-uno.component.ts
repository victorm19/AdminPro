import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica-uno',
  templateUrl: './grafica-uno.component.html',
  styles: [
  ]
})
export class GraficaUnoComponent {

  label1: string[] = ['Pan', 'Arroz', 'Tacos'];
  data1 = [
     [100, 200, 300],
   ];
}
