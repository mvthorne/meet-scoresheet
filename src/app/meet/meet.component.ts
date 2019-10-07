import { Component, OnInit } from '@angular/core';
import { MeetDataService } from '../meet-data.service';
import { MatBottomSheet } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {
  opened = true;
  meetData;
  currentEvent;
  currentPlace = 1;
  nextPlace = 1;
  tied = false;
  divePlaces = [];

  constructor(
    private meetService: MeetDataService,
    private confirm: MatBottomSheet
  ) { }

  ngOnInit() {
    this.meetData = this.meetService.getMeetData();
    this.currentEvent = this.meetData.events[0];
  }

  getEventClass(idx) {
    const ev = this.meetData.events[idx];
    if (ev.ourPoints !== undefined && ev.theirPoints !== undefined) {
      if (ev.ourPoints || ev.theirPoints) {
        if (ev.ourPoints > ev.theirPoints) {
          return 'event-won';
        } else if (ev.ourPoints < ev.theirPoints) {
          return 'event-lost';
        } else {
          return 'event-tied';
        }
      }
    }

    return '';
  }

  getEventText(idx) {
    const ev = this.meetData.events[idx];
    if (ev.ourPoints !== undefined && ev.theirPoints !== undefined) {
      if (ev.ourPoints || ev.theirPoints) {
        return ' (' + (ev.ourPoints - ev.theirPoints) + ')';
      }
    }

    return '';
  }

  selectEvent(idx) {
    this.currentEvent = this.meetData.events[idx];
    this.tied = false;

    // Determine the next place values
    if (this.currentEvent.name === 'Diving') {
      this.divePlaces = this.currentEvent.places;
    } else {
      let placeVal = 0;
      this.currentEvent.lanes.forEach(lane => {
        if (lane.place && lane.place > placeVal) {
          placeVal = lane.place;
        }
      });

      this.currentPlace = placeVal + 1;
      this.nextPlace = this.currentPlace;
    }

    this.opened = false;
  }

  getColor(idx) {
    if (!this.currentEvent.lanes[idx] || !this.currentEvent.lanes[idx].place) {
      return '';
    }

    if (this.currentEvent.lanes[idx].dqd) {
      return 'warn';
    }

    return 'primary';
  }

  getPlaceText(idx) {
    const places = ['', '1st', '2nd', '3rd', '4th', '5th', '6th'];

    if (!this.currentEvent.lanes[idx] || !this.currentEvent.lanes[idx].place) {
      return '';
    }

    let placeText = ' - ' + places[this.currentEvent.lanes[idx].place];
    if (this.currentEvent.lanes[idx].tied) {
      placeText += ' (tied)';
    }

    return placeText;
  }

  getDivingPlaceText(idx) {
    const places = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
    return places[idx];
  }

  selectLane(idx) {
    if (this.currentEvent.lanes[idx].dqd) {
      this.currentEvent.lanes[idx].dqd = false;
    } else if (this.currentEvent.lanes[idx].place) {
      this.currentEvent.lanes[idx].dqd = true;
    } else {
      this.currentEvent.lanes[idx].place = this.currentPlace;
      this.currentEvent.lanes[idx].tied = this.tied;
      this.nextPlace++;
      if (!this.tied) {
        this.currentPlace = this.nextPlace;
      }
    }
  }

  scoreEvent() {
    if (this.currentEvent.name === 'Diving') {
      this.currentEvent.places = this.divePlaces;
    }

    this.meetService.scoreEvent(this.currentEvent);

    // Reshow the event list
    this.opened = true;
  }

  toggleTied() {
    this.tied = !this.tied;
    if (!this.tied) {
      this.currentPlace = this.nextPlace;
    }
}

  reset() {
    const confirmRef = this.confirm.open(ConfirmComponent, {
      data: { text: 'Reset'}
    });

    confirmRef.afterDismissed().subscribe((result) => {
      if (result) {
        if (this.currentEvent.name === 'Diving') {
          this.currentEvent.places = [];
          this.divePlaces = [];
        } else {
          this.currentPlace = 1;
          this.nextPlace = 1;
          this.tied = false;

          this.currentEvent.lanes.forEach(lane => {
            lane.place = 0;
            lane.tied = false;
            lane.dqd = false;
          });
        }
      }
    });
  }
}
