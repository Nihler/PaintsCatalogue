import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paints-form',
  templateUrl: './paints-form.component.html',
  styleUrls: ['./paints-form.component.css'],
})
export class PaintsFormComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      manufacturer: new FormControl(null, {
        validators: [Validators.required],
      }),
      paintName: new FormControl(null, {
        validators: [Validators.required],
      }),
      type: new FormControl(null, {
        validators: [Validators.required],
      }),
      color: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onPaintSave() {
    console.dir(this.form);
  }
}
