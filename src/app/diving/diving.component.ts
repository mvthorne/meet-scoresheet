import { Component, OnInit } from '@angular/core';
import { MeetDataService } from '../meet-data.service';
import { MatDialog } from '@angular/material';
import { AddDiverComponent } from '../add-diver/add-diver.component';
import { DiveService } from '../dive.service';

@Component({
  selector: 'app-diving',
  templateUrl: './diving.component.html',
  styleUrls: ['./diving.component.css']
})
export class DivingComponent implements OnInit {
  opened = true;
  diveData;
  currentDiver = {
    diver: '',
    dives: [],
    overall: null
  };
  currentDive = {
    code: '',
    name: '',
    dd: 0,
    failed: false,
    judges: [],
    score: null,
    init: false
  };
  displayDive = {
    diveNumber: 1,
    first: 1,
    second: 0,
    third: 1,
    letter: 'B',
    valid: true,
    score: 0,
    judge1: '6',
    judge2: '6',
    judge3: '6'
  };

  constructor(
    private addDiverDialog: MatDialog,
    private meetService: MeetDataService,
    private diveService: DiveService
  ) { }

  ngOnInit() {
    this.diveData = this.meetService.getDiveData();
    if (this.diveData.length) {
      this.currentDiver = this.diveData[0];
      this.currentDive = this.currentDiver.dives[0];
    }
  }

  getDiverName() {
    if (this.currentDiver !== null) {
      let name = this.currentDiver.diver;
      if (this.currentDiver.overall !== undefined) {
        name += ' - Overall Score: ' + this.currentDiver.overall.toFixed(2);
      }

      return name;
    }

    return '';
  }

  getDiveDisplayName(dive, idx) {
    let buttonTitle = 'Dive #' + (idx + 1);
    if (dive.init) {
      buttonTitle += ' - ' + dive.code + ' (' + dive.dd + 'DD)';

      if (dive.failed) {
        buttonTitle += ' - Failed';
      } else if (dive.score > 0) {
        buttonTitle += ' - ' + dive.score.toFixed(2);
      }
    }

    return buttonTitle;
  }

  selectDiver(diver) {
    for (const dive of this.diveData) {
      if (dive.diver === diver) {
        this.currentDiver = dive;
        break;
      }
    }
  }

  addDiver() {
    const dialogRef = this.addDiverDialog.open(AddDiverComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.meetService.addDiver(result);
        this.selectDiver(result);
      }
    });
  }

  private determineDive() {
    this.currentDive.code = this.displayDive.first.toString() +
    this.displayDive.second.toString() +
    this.displayDive.third.toString() +
    this.displayDive.letter;
    this.currentDive.dd = this.diveService.getDificulty(this.currentDive.code);
    if (this.currentDive.dd === 0) {
        this.currentDive.name = 'Invalid dive number';
        this.displayDive.valid = false;
    } else {
        this.currentDive.name = this.diveService.getDiveName(this.currentDive.code);
        this.displayDive.valid = true;
    }
  }

  private getJudgeScore(judgeIdx) {
    if (this.currentDive.failed) {
      return 'X';
    }

    const scoreString = this.currentDive.judges[judgeIdx].toString();
    if (scoreString.includes('.5')) {
      return scoreString.replace('.5',  ' ½');
    }

    if (scoreString.includes('.25')) {
      return scoreString.replace('.5',  ' ¼');
    }

    if (scoreString.includes('.75')) {
      return scoreString.replace('.5',  ' ¾');
    }

    return scoreString;
  }

  private updateOverall() {
    let anyScored = false;
    this.currentDiver.overall = 0;
    for (const dive of this.currentDiver.dives) {
      if (dive.score !== undefined) {
        this.currentDiver.overall += dive.score;
        anyScored = true;
      }
    }

    if (!anyScored) {
      this.currentDiver.overall = undefined;
    }
  }

  private computeScore() {
    this.displayDive.judge1 = this.getJudgeScore(0);
    this.displayDive.judge2 = this.getJudgeScore(1);
    this.displayDive.judge3 = this.getJudgeScore(2);
    this.displayDive.score = 0;

    // Reset the Score
    this.currentDive.score = undefined;

    if (!this.currentDive.failed) {
      for (let i = 0; i < 3; i++) {
        this.displayDive.score += (this.currentDive.judges[i] * this.currentDive.dd);
      }
    }
  }

  private parseCode(diveCode) {
    const diveNum = diveCode;
    let idx = 0;

    if (diveNum.length === 5) {
        this.displayDive.first = parseInt(diveNum.substring(0, 2), 10);
        idx += 2;
    } else {
        this.displayDive.first = parseInt(diveNum[idx], 10);
        idx++;
    }

    this.displayDive.second = parseInt(diveNum[idx++], 10);
    this.displayDive.third = parseInt(diveNum[idx++], 10);
    this.displayDive.letter = diveNum[idx];

    this.determineDive();
    this.computeScore();
  }

  selectDive(idx) {
    this.currentDive = this.currentDiver.dives[idx];
    this.currentDive.init = false;
    this.displayDive.diveNumber = idx + 1;
    this.parseCode(this.currentDive.code);

    this.opened = false;
  }

  changeType(inc) {
    if ((this.displayDive.first + inc) === 0) {
        return;
    }

    if ((this.displayDive.first + inc) === 55) {
        return;
    }

    const newVal = this.displayDive.first + inc;
    if (newVal === 5) {
        this.displayDive.first = 51;
    } else if (newVal === 50) {
        this.displayDive.first = 4;
    } else {
        this.displayDive.first = newVal;
    }

    if (this.displayDive.first > 50 && this.displayDive.second === 0) {
        this.displayDive.second = 1;
    } else if (this.displayDive.first < 5 && this.displayDive.second > 0) {
        this.displayDive.second = 0;
    }

    this.determineDive();
    this.computeScore();
  }

  changeRotation(inc) {
    const newVal = this.displayDive.second + inc;
    if (newVal >= 0 && newVal < 10) {
        this.displayDive.second = newVal;
        this.determineDive();
        this.computeScore();
    }
  }

  changeMinorRotation(inc) {
    const newVal = this.displayDive.third + inc;
    if (newVal > 0 && newVal < 10) {
        this.displayDive.third = newVal;
    }

    this.determineDive();
    this.computeScore();
  }

  changePosition(inc) {
    const letters = ['A', 'B', 'C', 'D'];
    const idx = letters.indexOf(this.displayDive.letter) + inc;
    if (idx >= 0 && idx <= 3) {
        this.displayDive.letter = letters[idx];
    }

    this.determineDive();
    this.computeScore();
  }

  incScore(judgeIdx, incValue) {
    const oldScore = this.currentDive.judges[judgeIdx];
    if (incValue > 0) {
      if (oldScore === 10) {
        return;
      }
    } else if (oldScore === 0) {
      return;
    }

    this.currentDive.judges[judgeIdx] = oldScore + incValue;
    this.computeScore();
  }

  failDive() {
    this.currentDive.failed = !this.currentDive.failed;
    this.computeScore();
  }

  backToList() {
    this.currentDive.init = true;
    this.updateOverall();
    this.meetService.save();
    this.opened = true;
  }

  scoreDive() {
    this.currentDive.score = this.displayDive.score;
    this.backToList();
  }

  capDD() {
    if (this.currentDive.dd > 1.8) {
      this.currentDive.dd = 1.8;
      this.computeScore();
    }
  }
}
