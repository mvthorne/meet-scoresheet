import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiveService {
  ddValues1m = [];

  constructor() {
      // Forward Group
      this.ddValues1m['101A'] = 1.4;
      this.ddValues1m['101B'] = 1.3;
      this.ddValues1m['101C'] = 1.2;
      this.ddValues1m['102A'] = 1.6;
      this.ddValues1m['102B'] = 1.5;
      this.ddValues1m['102C'] = 1.4;
      this.ddValues1m['103A'] = 2.0;
      this.ddValues1m['103B'] = 1.7;
      this.ddValues1m['103C'] = 1.6;
      this.ddValues1m['104A'] = 2.6;
      this.ddValues1m['104B'] = 2.3;
      this.ddValues1m['104C'] = 2.2;
      this.ddValues1m['105B'] = 2.6;
      this.ddValues1m['105C'] = 2.4;
      this.ddValues1m['106C'] = 2.9;
      this.ddValues1m['107C'] = 3.0;

      // Back Group
      this.ddValues1m['201A'] = 1.7;
      this.ddValues1m['201B'] = 1.6;
      this.ddValues1m['201C'] = 1.5;
      this.ddValues1m['202A'] = 1.7;
      this.ddValues1m['202B'] = 1.6;
      this.ddValues1m['202C'] = 1.5;
      this.ddValues1m['203A'] = 2.5;
      this.ddValues1m['203B'] = 2.3;
      this.ddValues1m['203C'] = 2.0;
      this.ddValues1m['204B'] = 2.3;
      this.ddValues1m['204C'] = 2.0;
      this.ddValues1m['205B'] = 3.2;
      this.ddValues1m['205C'] = 3.0;

      // Reverse Group
      this.ddValues1m['301A'] = 1.8;
      this.ddValues1m['301B'] = 1.7;
      this.ddValues1m['301C'] = 1.6;
      this.ddValues1m['302A'] = 1.8;
      this.ddValues1m['302B'] = 1.7;
      this.ddValues1m['302C'] = 1.6;
      this.ddValues1m['303A'] = 2.7;
      this.ddValues1m['303B'] = 2.4;
      this.ddValues1m['303C'] = 2.1;
      this.ddValues1m['304B'] = 2.4;
      this.ddValues1m['304C'] = 2.1;
      this.ddValues1m['305B'] = 3.2;
      this.ddValues1m['305C'] = 3.0;

      // Inward Group
      this.ddValues1m['401A'] = 1.8;
      this.ddValues1m['401B'] = 1.5;
      this.ddValues1m['401C'] = 1.4;
      this.ddValues1m['402B'] = 1.7;
      this.ddValues1m['402C'] = 1.6;
      this.ddValues1m['403B'] = 2.4;
      this.ddValues1m['403C'] = 2.2;
      this.ddValues1m['404C'] = 2.8;
      this.ddValues1m['405B'] = 3.4;
      this.ddValues1m['405C'] = 3.1;

      // Twisting Group
      this.ddValues1m['5111A'] = 1.8;
      this.ddValues1m['5111B'] = 1.7;
      this.ddValues1m['5112A'] = 2.0;
      this.ddValues1m['5112B'] = 1.9;
      this.ddValues1m['5121D'] = 1.7;
      this.ddValues1m['5122D'] = 1.9;
      this.ddValues1m['5124D'] = 2.3;
      this.ddValues1m['5126D'] = 2.8;
      this.ddValues1m['5131D'] = 2.0;
      this.ddValues1m['5132D'] = 2.2;
      this.ddValues1m['5134D'] = 2.6;
      this.ddValues1m['5136D'] = 3.1;
      this.ddValues1m['5142B'] = 2.7;
      this.ddValues1m['5142C'] = 2.6;
      this.ddValues1m['5152B'] = 3.2;
      this.ddValues1m['5152C'] = 3.0;

      this.ddValues1m['5211A'] = 1.8;
      this.ddValues1m['5212A'] = 2.0;
      this.ddValues1m['5221D'] = 1.7;
      this.ddValues1m['5222D'] = 1.9;
      this.ddValues1m['5223D'] = 2.3;
      this.ddValues1m['5225D'] = 2.7;
      this.ddValues1m['5231D'] = 2.1;
      this.ddValues1m['5233D'] = 2.5;
      this.ddValues1m['5235D'] = 2.9;

      this.ddValues1m['5311A'] = 1.9;
      this.ddValues1m['5312A'] = 2.1;
      this.ddValues1m['5321D'] = 1.8;
      this.ddValues1m['5322D'] = 2.0;
      this.ddValues1m['5323D'] = 2.4;
      this.ddValues1m['5325D'] = 2.8;
      this.ddValues1m['5331D'] = 2.2;
      this.ddValues1m['5333D'] = 2.6;
      this.ddValues1m['5335D'] = 3.0;

      this.ddValues1m['5411A'] = 2.0;
      this.ddValues1m['5411B'] = 1.7;
      this.ddValues1m['5412A'] = 2.2;
      this.ddValues1m['5412B'] = 1.9;
      this.ddValues1m['5421B'] = 1.8;
      this.ddValues1m['5421C'] = 1.7;
      this.ddValues1m['5422D'] = 2.1;
      this.ddValues1m['5432D'] = 2.7;
      this.ddValues1m['5434D'] = 3.1;
  }

  getDiveName(diveNumber) {
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

  getDificulty(diveNumber) {
      let dd = this.ddValues1m[diveNumber];
      if (dd === undefined) {
          dd = 0;
      }

      return dd;
  }

  getDives() {
    const allDives = [];
    for (const key of this.ddValues1m) {
      allDives.push({
          number: key,
          name: this.getDiveName(key)
      });
    }

    return allDives;
  }
}
