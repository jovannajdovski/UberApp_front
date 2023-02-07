import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PanicService} from '../../services/panic/panic.service';

@Component({
  selector: 'app-panic-reason-dialog',
  templateUrl: './panic-reason-dialog.component.html',
  styleUrls: ['./panic-reason-dialog.component.scss']
})
export class PanicReasonDialogComponent {
  panicForm = new FormGroup({
    reason: new FormControl('', [Validators.required]),
  });

  constructor(private panicService: PanicService) {
  }

  sendPanic() {
    this.panicService.sendPanicToParent(this.panicForm.value.reason || "");
  }

  cancel() {
    this.panicService.sendPanicToParent("");
  }
}
