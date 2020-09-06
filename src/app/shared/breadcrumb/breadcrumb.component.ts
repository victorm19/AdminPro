import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnDestroy {

  public _titulo: string = '';
  public tituloSub$: Subscription;

  constructor(private router: Router) {
   this.tituloSub$ = this.getArgumentosRuta()
     .subscribe(({titulo}) => {
        this._titulo = titulo;
        document.title = `Admin Pro ${this._titulo}`
 });
   }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }


   getArgumentosRuta() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),
    );
   }

}
