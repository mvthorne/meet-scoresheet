import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-diver',
  templateUrl: './add-diver.component.html',
  styleUrls: ['./add-diver.component.css']
})
export class AddDiverComponent implements OnInit {
  name = '';

  constructor(
    public dialogRef: MatDialogRef<AddDiverComponent>
  ) { }

  ngOnInit() {
  }

  ok() {
    if (this.name) {
      this.dialogRef.close(this.name);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
