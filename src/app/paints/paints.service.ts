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

  getPaintsUpdateListener() {
    return this.paintsUpdated.asObservable();
  }

  addPaint(name: string, manufacturer: string, type: string) {
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
    };
    this.http
      .post<{ message: string }>(BACKEND_URL, paintData)
      .subscribe((resData) => {
        // this.router.navigate(['/']);
        console.log(resData);
      });
  }

  getAllPaints(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; paints: any; maxArticles: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((resData) => {
          console.log(resData);
          return {
            paints: resData.paints.map(
              (paint: {
                _id: string;
                name: string;
                manufacturer: string;
                type: string;
                color: string;
                status: string;
              }) => {
                return {
                  id: paint._id,
                  name: paint.name,
                  manufacturer: paint.manufacturer,
                  type: paint.type,
                  color: paint.color,
                  status: paint.status,
                };
              }
            ),
            maxPaints: resData.maxArticles,
          };
        })
      )
      .subscribe((transformedResData) => {
        // console.log(transformedPostData);
        this.paints = transformedResData.paints;
        this.paintsUpdated.next({
          paints: [...this.paints],
          paintsCount: transformedResData.maxPaints,
        });
      });

    // return [...this.posts];
  }

  addPaintToInventory(paintId: String) {
    this.http
      .post(BACKEND_URL + '/addToEq', { paintId: paintId })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
