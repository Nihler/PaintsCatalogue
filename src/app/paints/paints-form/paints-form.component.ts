import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaintService } from '../paints.service';

@Component({
  selector: 'app-paints-form',
  templateUrl: './paints-form.component.html',
  styleUrls: ['./paints-form.component.css'],
})
export class PaintsFormComponent implements OnInit {
  form: FormGroup;

  constructor(private paintService: PaintService) {}

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
    this.paintService.addPaint(
      this.form.value.paintName,
      this.form.value.manufacturer,
      this.form.value.type,
      this.form.value.color
    );
  }
}
