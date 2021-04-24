import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  this.getUsuarios().then(() => {

  });
  }

  getUsuarios() {
   return new Promise( resolve => {
      fetch('/api/users')
      .then( resp => resp.json())
      .then( body => console.log(body.data));

    });
  }

}
