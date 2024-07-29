import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private sidenavEvent = new Subject<boolean>();

  sidenavToggleStatus() {
    return this.sidenavEvent.asObservable();
  }

  sidenavToggle(status: boolean) {
    this.sidenavEvent.next(!status);
  }
}
