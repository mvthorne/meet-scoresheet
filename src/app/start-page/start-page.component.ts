import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetDataService } from '../meet-data.service';
import { MatBottomSheet } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  newMeetOpened = false;
  oldMeets = [];
  defaultTeam = '';

  constructor(
    private router: Router,
    private meetService: MeetDataService,
    private confirm: MatBottomSheet
  ) {
  }

  ngOnInit() {
    this.defaultTeam = this.meetService.getLastUs();
    this.oldMeets = this.meetService.getOldMeets();
    if (this.oldMeets.length === 0) {
      this.newMeetOpened = true;
    }
  }

  startMeet(f: NgForm) {
    if (!f.valid) {
      return;
    }

    const hasDiving = f.value.hasDiving === 'yes';
    this.meetService.startNewMeet(f.value.ourTeam, f.value.theirTeam, f.value.numLanes, f.value.laneAssignment, hasDiving);
    this.router.navigate(['meet']);
  }

  selectMeet(idx) {
    this.meetService.openOldMeet(idx);
    this.router.navigate(['meet']);
  }

  deleteMeet(idx) {
    const confirmRef = this.confirm.open(ConfirmComponent, {
      data: { text: 'Delete'}
    });

    confirmRef.afterDismissed().subscribe((result) => {
      if (result) {
        this.meetService.deleteMeet(idx);
        this.oldMeets = this.meetService.getOldMeets();
        if (this.oldMeets.length === 0) {
          this.newMeetOpened = true;
        }
      }
    });
  }
}
