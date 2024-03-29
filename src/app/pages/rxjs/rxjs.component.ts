import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs: Subscription;

  constructor() { 
  this.intervalSubs = this.retornaIntervalo().subscribe();
    }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      //take(10),
      map(valor =>  valor + 1 ),
      filter( valor => (valor % 2 === 0) ? true : false)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const intervalo = setInterval( () => {
        i++;
        observer.next(i)

        if(i === 4) {
        clearInterval(intervalo);
        observer.complete();
        }
      }, 1000)

      if(i === 2) {
        observer.error('i llego al valor 2');
      }
    })
  }

}
  