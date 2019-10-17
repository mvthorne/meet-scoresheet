import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { MeetComponent } from './meet/meet.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DivingComponent } from './diving/diving.component';
import { AddDiverComponent } from './add-diver/add-diver.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    StartPageComponent,
    MeetComponent,
    ConfirmComponent,
    DivingComponent,
    AddDiverComponent
  ],
  entryComponents: [
    ConfirmComponent,
    AddDiverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
