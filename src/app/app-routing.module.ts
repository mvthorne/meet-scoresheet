import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { MeetComponent } from './meet/meet.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'meet', component: MeetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
