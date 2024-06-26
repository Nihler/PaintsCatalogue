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
  paintsSub: Subscription;
  paints: Paint[] = [];
  filteredOptions: Observable<Paint[]>;
  paintTypes = ['Base', 'Layer', 'Shade', 'Contrast'];
  mode = 'list';
  private userId = '';

  private authListenerSubs: Subscription;
  isLoggedIn = false;

  form: FormGroup;
  paintName: FormControl;

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
    this.paintName = new FormControl(null, {
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
        resData.paints.forEach((element) => {
          this.paints.push(element);
        });
        console.log(this.paints);
        this.filteredOptions = this.paintName.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || '', this.paints))
        );
        console.log(this.filteredOptions);
        //resData.paints;
        //console.log(this.paints);
      });

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
