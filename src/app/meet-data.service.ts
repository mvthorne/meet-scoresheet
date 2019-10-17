import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetDataService {
  meetData;
  meetIdx;

  constructor() { }

  getOldMeets() {
    this.meetData = [];
    const oldMeets = [];
    const tempData = window.localStorage.getItem('meet.data');
    if (tempData) {
      this.meetData = JSON.parse(tempData);
      for (const meet of this.meetData) {
        const meetName = meet.ourTeam + ' vs ' + meet.theirTeam;
        oldMeets.push(meetName);
      }
    }

    return oldMeets;
  }

  getLastUs() {
    return window.localStorage.getItem('meet.ourTeam');
  }

  save() {
    window.localStorage.setItem('meet.data', JSON.stringify(this.meetData));
  }

  private addLane(event, idx, name) {
    event.lanes.push({
      name,
      idx,
      place: 0,
      placeText: '',
      disqualified: false
    });
  }

  private addEvent(eventList, name, isRelay, lanes) {
    const newEvent = {
      name,
      isRelay,
      nextPlace: 1,
      differential: -1,
      lanes: []
    };

    for (let idx = 1; idx <= lanes; idx++) {
      this.addLane(newEvent, idx, 'Lane ' + idx);
    }

    eventList.push(newEvent);
  }

  startNewMeet(us, them, lanes, oddOnes, diving) {
    window.localStorage.setItem('meet.ourTeam', us);

    const meet = {
      ourTeam: us,
      theirTeam: them,
      ourScore: 0,
      theirScore: 0,
      laneCount: parseInt(lanes, 10),
      oddLanes: oddOnes === 'odd',
      hasDiving: diving,
      date: new Date(),
      events: []
    };

    this.addEvent(meet.events, '200 Medley Relay', true, meet.laneCount);
    this.addEvent(meet.events, '200 Freestyle', false, meet.laneCount);
    this.addEvent(meet.events, '200 I. M.', false, meet.laneCount);
    this.addEvent(meet.events, '50 Freestyle', false, meet.laneCount);

    if (meet.hasDiving) {
      meet.events.push({name: 'Diving', places: []});
    }

    this.addEvent(meet.events, '100 Butterfly', false, meet.laneCount);
    this.addEvent(meet.events, '100 Freestyle', false, meet.laneCount);
    this.addEvent(meet.events, '500 Freestyle', false, meet.laneCount);
    this.addEvent(meet.events, '200 Freestyle Relay', true, meet.laneCount);
    this.addEvent(meet.events, '100 Backstroke', false, meet.laneCount);
    this.addEvent(meet.events, '100 Breaststroke', false, meet.laneCount);
    this.addEvent(meet.events, '400 Freestyle Relay', true, meet.laneCount);

    if (this.meetData.length) {
      this.meetData.splice(0, 0, meet);
    } else {
      this.meetData.push(meet);
    }

    this.meetIdx = 0;
    this.save();
  }

  openOldMeet(idx) {
    this.meetIdx = idx;
  }

  getMeetData() {
    if (this.meetData === undefined) {
      return undefined;
    }

    return this.meetData[this.meetIdx];
  }

  private updateOverall(thisMeet) {
    thisMeet.ourScore = 0;
    thisMeet.theirScore = 0;
    thisMeet.events.forEach(meetEvent => {
      if (meetEvent.ourPoints) {
        thisMeet.ourScore += meetEvent.ourPoints;
        thisMeet.theirScore += meetEvent.theirPoints;
      }
    });
  }

  private scoreSwimming(event) {
    let points = [];
    const thisMeet = this.getMeetData();
    if (thisMeet.laneCount === 6) {
      if (event.isRelay) {
        points = [8, 4, 2, 0, 0, 0];
      } else {
        points = [6, 4, 3, 2, 1, 0];
      }
    } else {
      if (event.isRelay) {
        points = [6, 3, 1, 0];
      } else {
        points = [4, 3, 1, 0];
      }
    }

    event.ourPoints = 0;
    event.theirPoints = 0;

    // Determine the place order by lane
    const laneOrder = [];
    const pointsAwarded = [];
    let pointIndex = 0;
    for (let place = 1; place <= points.length; place++) {
      let placers = 0;
      event.lanes.forEach(lane => {
        if (lane.place !== undefined && !lane.dqd) {
          if (lane.place === place) {
            laneOrder.push(lane.idx);
            placers++;
          }
        }
      });

      if (placers > 0) {
        let pointTotal = 0;
        for (let placer = 0; placer < placers; placer++) {
          pointTotal += points[pointIndex + placer];
        }

        pointTotal /= placers;
        for (let placer = 0; placer < placers; placer++) {
          pointsAwarded.push(pointTotal);
        }

        pointIndex += placers;
      }
    }

    // Award the points
    for (let idx = 0; idx < laneOrder.length; idx++) {
      if (laneOrder[idx] % 2) {
        if (thisMeet.oddLanes) {
          event.ourPoints += pointsAwarded[idx];
        } else {
          event.theirPoints += pointsAwarded[idx];
        }
      } else {
        if (thisMeet.oddLanes) {
          event.theirPoints += pointsAwarded[idx];
        } else {
          event.ourPoints += pointsAwarded[idx];
        }
      }
    }

    /*
    event.lanes.forEach(lane => {
      if (lane.place !== undefined) {
        // If odd lane
        if (lane.idx % 2) {
          if (thisMeet.oddLanes) {
            event.ourPoints += points[lane.place];
          } else {
            event.theirPoints += points[lane.place];
          }
        } else {
          if (thisMeet.oddLanes) {
            event.theirPoints += points[lane.place];
          } else {
            event.ourPoints += points[lane.place];
          }
        }
      }
    });
    */

    this.updateOverall(thisMeet);
  }

  private scoreDiving(event) {
    const thisMeet = this.getMeetData();
    event.ourPoints = 0;
    event.theirPoints = 0;
    const points = [6, 4, 3, 2, 1, 0];

    let i = 0;
    event.places.forEach(who => {
      if (who === 'us') {
        event.ourPoints += points[i];
      } else {
        event.theirPoints += points[i];
      }

      i++;
    });

    this.updateOverall(thisMeet);
  }

  scoreEvent(event) {
    if (event.name === 'Diving') {
      this.scoreDiving(event);
    } else {
      this.scoreSwimming(event);
    }

    this.save();
  }

  private getDiveName(diveNumber) {
    let idx = 0;
    let first = 0;
    if (diveNumber.length === 5) {
        first = parseInt(diveNumber.substring(0, 2), 10);
        idx += 2;
    } else {
        first = parseInt(diveNumber[idx], 10);
        idx++;
    }

    const second = parseInt(diveNumber[idx++], 10);
    const third = parseInt(diveNumber[idx++], 10);
    const letter = diveNumber[idx];
    let currentDiveName = '';

    switch (first) {
        case 1: {
            currentDiveName = 'Forward ';
            break;
        }
        case 2: {
            currentDiveName = 'Back ';
            break;
        }
        case 3: {
            currentDiveName = 'Reverse ';
            break;
        }
        case 4: {
            currentDiveName = 'Inward ';
            break;
        }
        case 51: {
            currentDiveName = 'Forward ';
            break;
        }
        case 52: {
            currentDiveName = 'Back ';
            break;
        }
        case 53: {
            currentDiveName = 'Reverse ';
            break;
        }
        case 54: {
            currentDiveName = 'Inward ';
            break;
        }
    }

    if (second === 0) {
        switch (third) {
            case 1: {
                currentDiveName += 'Dive ';
                break;
            }
            case 2: {
                currentDiveName += 'Somersault ';
                break;
            }
            case 3: {
                currentDiveName += '1 ½ Somersault ';
                break;
            }
            case 4: {
                currentDiveName += 'Double Somersault ';
                break;
            }
            case 5: {
                currentDiveName += '2 ½ Somersault ';
                break;
            }
            case 6: {
                currentDiveName += 'Triple Somersault ';
                break;
            }
            case 7: {
                currentDiveName += '3 ½ Somersault ';
                break;
            }
            case 9: {
                currentDiveName += '4 ½ Somersault ';
                break;
            }
        }
    } else {
        switch (second) {
            case 1: {
                currentDiveName += 'Dive ';
                break;
            }
            case 2: {
                currentDiveName += 'Somersault ';
                break;
            }
            case 3: {
                currentDiveName += '1 ½ Somersault ';
                break;
            }
            case 4: {
                currentDiveName += 'Double Somersault ';
                break;
            }
            case 5: {
                currentDiveName += '2 ½ Somersault ';
                break;
            }
            case 7: {
                currentDiveName += '3 ½ Somersault ';
                break;
            }
        }

        switch (third) {
            case 1: {
                currentDiveName += '½ Twist ';
                break;
            }
            case 2: {
                currentDiveName += '1 Twist ';
                break;
            }
            case 3: {
                currentDiveName += '1 ½ Twists ';
                break;
            }
            case 4: {
                currentDiveName += '2 Twists ';
                break;
            }
            case 5: {
                currentDiveName += '2 ½ Twists ';
                break;
            }
            case 6: {
                currentDiveName += '3 Twists ';
                break;
            }
            case 7: {
                currentDiveName += '3 ½ Twists ';
                break;
            }
            case 8: {
                currentDiveName += '4 Twists ';
                break;
            }
            case 9: {
                currentDiveName += '4 ½ Twists ';
                break;
            }
        }
    }

    switch (letter) {
        case 'A': {
            currentDiveName += 'Straight Position';
            break;
        }
        case 'B': {
            currentDiveName += 'Pike Position';
            break;
        }
        case 'C': {
            currentDiveName += 'Tuck Position';
            break;
        }
        case 'D': {
            currentDiveName += 'Free Position';
            break;
        }
    }

    return currentDiveName;
}

  addDiver(diverName) {
    const thisMeet = this.getMeetData();
    const code = '101B';
    const name = this.getDiveName(code);
    const dd = 1.3;
    const judge = 6.0;

    thisMeet.diving.push({
      diver: diverName,
      dives: [
        { code, name, dd, judges: [judge, judge, judge], failed: false, init: false },
        { code, name, dd, judges: [judge, judge, judge], failed: false, init: false },
        { code, name, dd, judges: [judge, judge, judge], failed: false, init: false },
        { code, name, dd, judges: [judge, judge, judge], failed: false, init: false },
        { code, name, dd, judges: [judge, judge, judge], failed: false, init: false },
        { code, name, dd, judges: [judge, judge, judge], failed: false, init: false },
      ]
    });

    if (thisMeet.diving.length === 1) {
      window.localStorage.setItem('meet.mainDiver', diverName);
    }

    this.save();
  }

  getDiveData() {
    const thisMeet = this.getMeetData();
    if (thisMeet.diving === undefined) {
      thisMeet.diving = [];
      const mainDiver = window.localStorage.getItem('meet.mainDiver');
      if (mainDiver) {
        this.addDiver(mainDiver);
      }
    }

    return thisMeet.diving;
  }

  deleteMeet(idx) {
    this.meetData.splice(idx, 1);
    this.save();
  }
}
