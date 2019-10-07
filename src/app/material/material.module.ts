import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatButtonModule,
  MatExpansionModule,
  MatInputModule,
  MatSidenavModule,
  MatIconModule,
  MatGridListModule,
  MatBottomSheetModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatInputModule,
  MatSidenavModule,
  MatIconModule,
  MatGridListModule,
  MatBottomSheetModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
