import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaintService } from '../paints.service';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Paint } from '../paint.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-paints-list',
  templateUrl: './paints-list.component.html',
  styleUrls: ['./paints-list.component.css'],
})
export class PaintsListComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  private userId = '';

  paintsSub: Subscription;
  filteredOptions$: Observable<Paint[]>;

  paints: Paint[] = [];
  userPaints: Paint[] = [];
  wishlistPaints: Paint[] = [];
  paintTypes = ['Base', 'Layer', 'Shade', 'Contrast'];

  mode = 'list';
  isLoading = true;
  isLoggedIn = false;

  form: FormGroup;
  paintNameInput: FormControl;

  constructor(
    private paintService: PaintService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private _filter(value: string, array: Paint[]): Paint[] {
    const filterValue = value.toLowerCase();

    return array.filter((paint) =>
      paint.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    //setup searchbar
    this.paintNameInput = new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    });

    //populate table of all paints depending on mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //get username if it is in url
      if (paramMap.has('userId')) {
        this.mode = this.route.snapshot.url[1].toString();
        this.userId = paramMap.get('userId');
      }
      //if its user inventory then get their paints only
      if (this.mode === 'inventory') {
        this.paintService.getUserPaints(this.userId);
        this.paintsSub = this.paintService
          .getUserPaintsUpdateListener()
          .subscribe((resData: { paints: Paint[]; paintsCount: number }) => {
            this.paints = resData.paints;
            this.filteredOptions$ = this.paintNameInput.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value || '', this.paints))
            );
          });
        //if its wishlist get only wishlist paints
      } else if (this.mode === 'wishlist') {
        this.paintService.getUserWishlist(this.userId);
        this.paintsSub = this.paintService
          .getWishlistUpdateListener()
          .subscribe((resData: { paints: Paint[]; paintsCount: number }) => {
            this.wishlistPaints = resData.paints;
            this.filteredOptions$ = this.paintNameInput.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value || '', this.wishlistPaints))
            );
          });
      }
      // if its common list, get all paints
      else {
        this.paintService.getAllPaints();
        this.paintsSub = this.paintService
          .getPaintsUpdateListener()
          .subscribe((resData: { paints: Paint[]; paintsCount: number }) => {
            this.filteredOptions$ = this.paintNameInput.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value || '', resData.paints))
            );
          });
      }
    });
    //check if user is logged in
    this.isLoggedIn = this.authService.getIsAuth();

    //get logged user paints for comparing to all list
    if (
      this.isLoggedIn &&
      this.mode != 'inventory' &&
      this.mode != 'wishlist'
    ) {
      this.paintService.getUserPaints(this.authService.getUserName());
      this.paintService.getUserPaintsUpdateListener().subscribe((result) => {
        this.userPaints = result.paints;
      });
      this.paintService.getUserWishlist(this.authService.getUserName());
      this.paintService.getWishlistUpdateListener().subscribe((result) => {
        this.wishlistPaints = result.paints;
      });
    }

    //listen to changes in authentication status
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });

    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.paintsSub.unsubscribe();
  }

  addToInventory(paint: Paint) {
    this.paintService.addPaintToInventory(paint.id);
    const index = this.userPaints.map((p) => p.id).indexOf(paint.id);

    if (index >= 0) {
      this.userPaints.splice(index, 1);
    } else {
      this.userPaints.push(paint);
    }

    if (this.mode === 'wishlist') {
      this.addToWishlist(paint);
    }
  }

  addToWishlist(paint: Paint) {
    console.log(this.filteredOptions$);
    this.paintService.addPaintToWishlist(paint.id);
    let index: number;
    let tempSub;
    index = this.wishlistPaints.map((p) => p.id).indexOf(paint.id);
    if (index >= 0) {
      this.wishlistPaints.splice(index, 1);
      if (this.mode === 'wishlist') {
        tempSub = this.filteredOptions$.subscribe((value) => {
          value.splice(index, 1);
        });
        this.filteredOptions$ = this.paintNameInput.valueChanges.pipe(
          startWith(''),
          map((input) => this._filter(input || '', this.wishlistPaints))
        );
        this.paintNameInput.setValue('');
        tempSub.unsubscribe();
      }
    } else {
      this.wishlistPaints.push(paint);
    }
  }

  addBookmarkEnter(button: any) {
    const newName = button.name.split('-', 1).join('-');
    button.name = newName;
    button.name.split('-').pop();
  }

  addMouseEnter(button: any) {
    const newName = button.name.split('-', 2).join('-');
    button.name = newName;
    button.name.split('-').pop();
  }

  mouseLeave(button: any) {
    button.name = button.name + '-outline';
  }

  isIncludedInInventory(paint: Paint) {
    if (this.userPaints.some((e) => e.id === paint.id)) {
      return true;
    } else return false;
  }

  isIncludedInWishlist(paint: Paint) {
    if (this.wishlistPaints.some((e) => e.id === paint.id)) {
      return true;
    } else return false;
  }
}
