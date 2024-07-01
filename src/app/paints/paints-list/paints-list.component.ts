import { Component, OnInit } from '@angular/core';
import { PaintService } from '../paints.service';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Paint } from '../paint.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-paints-list',
  templateUrl: './paints-list.component.html',
  styleUrls: ['./paints-list.component.css'],
})
export class PaintsListComponent implements OnInit {
  private authListenerSubs: Subscription;
  private userId = '';

  paintsSub: Subscription;
  filteredOptions$: Observable<Paint[]>;

  paints: Paint[] = [];
  paintTypes = ['Base', 'Layer', 'Shade', 'Contrast'];

  mode = 'list';
  isLoading = true;
  isLoggedIn = false;

  form: FormGroup;
  paintNameInput: FormControl;

  constructor(
    private paintService: PaintService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  private _filter(value: string, array: Paint[]): Paint[] {
    const filterValue = value.toLowerCase();

    return array.filter((paint) =>
      paint.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    //this.form = new FormGroup({});
    this.paintNameInput = new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'inventory';
        this.userId = paramMap.get('userId');
        this.paintService.getUserPaints(this.userId);
      } else {
        this.paintService.getAllPaints();
      }
    });

    this.paintsSub = this.paintService
      .getPaintsUpdateListener()
      .subscribe((resData: { paints: Paint[]; paintsCount: number }) => {
        console.log(resData.paints);
        // console.log(this.paints);
        this.filteredOptions$ = this.paintNameInput.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || '', resData.paints))
        );
        console.log(this.filteredOptions$);
        //resData.paints;
        //console.log(this.paints);
      });

    this.isLoading = false;
    this.isLoggedIn = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
  }

  addToInventory(paint: Paint) {
    console.log(paint);
    this.paintService.addPaintToInventory(paint.id);
  }
}
