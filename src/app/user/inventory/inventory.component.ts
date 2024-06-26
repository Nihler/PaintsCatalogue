import { Component, OnInit } from '@angular/core';
import { PaintService } from 'src/app/paints/paints.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  constructor(private paintService: PaintService) {}

  ngOnInit(): void {}
}
