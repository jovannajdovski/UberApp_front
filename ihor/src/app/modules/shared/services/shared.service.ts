import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private snackMessage$ = new BehaviorSubject<string | null>(null);
  newSnackMessage$ = this.snackMessage$.asObservable();

  constructor() {
  }

  openSnack(message: string) {
    this.snackMessage$.next(message);
  }

  dismiss() {
    this.snackMessage$ = new BehaviorSubject<string | null>(null);
    this.newSnackMessage$ = this.snackMessage$.asObservable();
  }

}
