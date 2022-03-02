import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangDirService {

  lang = new BehaviorSubject('ltr');
  constructor() {}

}
