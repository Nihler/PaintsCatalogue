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
  private userPaints: Paint[] = [];
  private wishlistPaints: Paint[] = [];
  private paintsUpdated = new Subject<any>();
  private userPaintsUpdated = new Subject<any>();
  private userWishlistUpdated = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  getPaintsUpdateListener() {
    return this.paintsUpdated.asObservable();
  }

  getUserPaintsUpdateListener() {
    return this.userPaintsUpdated.asObservable();
  }

  getWishlistUpdateListener() {
    return this.userWishlistUpdated.asObservable();
  }

  //add Paint to database, probably will be removed
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
      });
  }

  addPaintToInventory(paintId: String) {
    this.http
      .post(BACKEND_URL + '/addToEq', { paintId: paintId, mode: 'inventory' })
      .subscribe((res) => {});
  }

  addPaintToWishlist(paintId: String) {
    this.http
      .post(BACKEND_URL + '/addToEq', { paintId: paintId, mode: 'wishlist' })
      .subscribe((res) => {});
  }

  //get a list of all Paints in db
  getAllPaints() {
    this.http
      .get<{ message: string; paints: any; maxArticles: number }>(BACKEND_URL)
      .pipe(
        map((resData) => {
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
        this.paints = transformedResData.paints;
        this.paintsUpdated.next({
          paints: [...this.paints],
          paintsCount: transformedResData.maxPaints,
        });
      });
  }

  getUserPaints(username: String) {
    this.http
      .get<{ message: string; paints: any; maxArticles: number }>(
        BACKEND_URL + 'getEq/' + username
      )
      .pipe(
        map((resData) => {
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
        this.userPaints = transformedResData.paints;
        this.userPaintsUpdated.next({
          paints: [...this.userPaints],
          paintsCount: transformedResData.maxPaints,
        });
      });
  }

  getUserWishlist(username: String) {
    this.http
      .get<{ message: string; paints: any; maxArticles: number }>(
        BACKEND_URL + 'getWishlist/' + username
      )
      .pipe(
        map((resData) => {
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
        this.wishlistPaints = transformedResData.paints;
        this.userWishlistUpdated.next({
          paints: [...this.wishlistPaints],
          paintsCount: transformedResData.maxPaints,
        });
      });
  }
}
