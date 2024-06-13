import { Component, OnInit } from '@angular/core';
import { PaintService } from '../paints.service';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Paint } from '../paint.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paints-list',
  templateUrl: './paints-list.component.html',
  styleUrls: ['./paints-list.component.css'],
})
export class PaintsListComponent implements OnInit {
  paintsSub: Subscription;
  paints: string[] = [];
  filteredOptions: Observable<string[]>;

  form: FormGroup;
  paintName: FormControl;

  constructor(private paintService: PaintService) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.paints.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    //this.form = new FormGroup({});
    this.paintName = new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    });
    this.paintService.getAllPaints(10, 1);
    this.paintsSub = this.paintService
      .getPaintsUpdateListener()
      .subscribe((resData: { paints: Paint[]; paintsCount: number }) => {
        resData.paints.forEach((element) => {
          this.paints.push(element.name);
        });
        console.log(this.paints);
        this.filteredOptions = this.paintName.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
        //resData.paints;
        //console.log(this.paints);
      });
  }
}
