import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../core/login/login.service";
import {Trainingsschema} from './trainingsschema.domain';
import {HttpClient} from '@angular/common/http';
import {Platform} from 'ionic-angular';
import {switchMap} from 'rxjs/operators';

const trainingsschemaUrl = '/mvollebregt/loopgroepgroningen/master/rest/trainingsschema.json';

@Injectable()
export class TrainingsschemaClient {

  private baseUrl: string;

  constructor(platform: Platform,
              private loginService: LoginService,
              private http: HttpClient) {
    this.baseUrl = platform.url().startsWith('file:') ? 'https://raw.githubusercontent.com' : '';
  }

  haalTrainingsschemaOp(): Observable<Trainingsschema> {
    // alleen tonen als ingelogd
    return this.loginService.login().pipe(
      switchMap(() => this.http.get<Trainingsschema>(this.baseUrl + trainingsschemaUrl))
    );
  }
}
