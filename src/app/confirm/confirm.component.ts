import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private confirmRef: MatBottomSheetRef<ConfirmComponent>
  ) { }

  ngOnInit() {
  }

  confirm() {
    this.confirmRef.dismiss(true);
  }

  cancel() {
    this.confirmRef.dismiss(false);
  }
}
