import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Paint } from './paint.model';

import { envionment } from '../../environments/environment';

const BACKEND_URL = envionment.apiUrl + 'paint/';

@Injectable({ providedIn: 'root' })
export class PaintService {
  private paints: Paint[] = [];
  private paintsUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  addPaint(name: string, manufacturer: string, type: string, color: string) {
    // const paintData = new FormData();
    // paintData.append('name', name);
    // paintData.append('manufacturer', manufacturer);
    // paintData.append('type', type);
    // paintData.append('color', color);
    // paintData.append('status', 'new');

    const paintData = {
      name: name,
      manufacturer: manufacturer,
      type: type,
      color: color,
      status: 'new',
    };

    console.log(paintData);

    // const config = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json'),
    // };

    this.http
      .post<{ message: string }>(BACKEND_URL, paintData)
      .subscribe((resData) => {
        // this.router.navigate(['/']);
        console.log(resData);
      });
  }
}
