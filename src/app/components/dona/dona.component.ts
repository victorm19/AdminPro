import { Component, Input, Output } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

   // Doughnut
   @Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
   @Input('data') doughnutChartData: MultiDataSet = [
     [350, 450, 100],
   ];
 
   public colors: Color [] = [
     { backgroundColor: ['#6857E6', '#099FEE', '#F02059']}
   ]

   @Input() title: string = 'sin titulo';

}
