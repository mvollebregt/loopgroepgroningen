import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Prikbordbericht} from "./prikbordbericht";

@Injectable()
export class PrikbordProvider {

  constructor(private http: Http) {
  }

  // haalBerichtenOp() : Observable<Prikbordbericht> {
  //
  // }

}
