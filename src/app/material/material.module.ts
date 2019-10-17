import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatButtonModule,
  MatExpansionModule,
  MatInputModule,
  MatSidenavModule,
  MatIconModule,
  MatBottomSheetModule,
  MatDialogModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatInputModule,
  MatSidenavModule,
  MatIconModule,
  MatBottomSheetModule,
  MatDialogModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
