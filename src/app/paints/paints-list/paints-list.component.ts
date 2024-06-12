import { Component, OnInit } from '@angular/core';
import { PaintService } from '../paints.service';
import { Subscription } from 'rxjs';
import { Paint } from '../paint.model';

@Component({
  selector: 'app-paints-list',
  templateUrl: './paints-list.component.html',
  styleUrls: ['./paints-list.component.css'],
})
export class PaintsListComponent implements OnInit {
  paintsSub: Subscription;
  paints: Paint[] = [];
  constructor(private paintService: PaintService) {}

  ngOnInit(): void {
    this.paintService.getAllPaints(10, 1);
    this.paintsSub = this.paintService
      .getPaintsUpdateListener()
      .subscribe((resData: { paints: Paint[]; paintsCount: number }) => {
        this.paints = resData.paints;
        console.log(this.paints);
      });
  }
}
