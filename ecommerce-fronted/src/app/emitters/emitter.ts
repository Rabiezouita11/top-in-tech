import {EventEmitter} from '@angular/core';

export class Emitters {
  static authEmitter = new EventEmitter<boolean>();
  static authEmitter2 = new EventEmitter<boolean>();
}